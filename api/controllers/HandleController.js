const secretKey = sails.config.custom.secretKey;
const api_key = sails.config.custom.api_key;
const DOMAIN = sails.config.custom.DOMAIN;
const mailgun_from = sails.config.custom.mailgun_from;

const jwt = require('jsonwebtoken');
const action = require('./Actions');
const mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});


module.exports = {
  get: async(req, res) => {
    let logged;
    let data;
    let model;
    let where = {};
    let params = {};
    let result = {};

    if (req.limit) {
      params.limit = req.limit;
      params.skip = req.skip;
    }

    if (req.id) {
      logged = req.id;
    }

    if (req.params.model) {
      model = req.params.model.toLowerCase();
    }

    if (req.params.optional) {
      switch(req.params.optional) {
        case 'users':
          where.owner = req.params.id;
          break;
        case 'comments':
          where.comment = req.params.id;
          break;
        case 'topics':
          where.topic = req.params.id;
          break;
      }
    } else if (req.params.id) {
      where.id = req.params.id;
    }

    if (Object.keys(where).length !== 0) {
      params.where = where;
    }

    if (model === 'users' && !req.id) {
      res.json(401, 'Token required');
    }

    data = await action.find(model,params,logged);
    if (data.length > 0) {
      result.model = model;
      result.data = data;

      res.json(result);
    } else {
      res.notFound();
    }
  },


  post: async(req, res) => {
    let assert;
    let result;
    let model;
    let params = {};
    if (req.params.model && req.params.model === 'topics') {
      model = req.params.model;
    }
    if (req.params.id) {
      if (req.params.id === 'signup') {
        model = 'users';
      }
      switch(req.params.model) {
        case 'topics':
          model = 'comments';
          params.topic = req.params.id;
          break;
        case 'comments':
          model = 'likes';
          params.comment = req.params.id;
          break;
      }
    }

    if (Object.keys(req.body).length !== 0) {
      for (key in  req.body) {
        if (key === 'name') {
          params[key] = req.body[key].toLowerCase();
        } else if (key === 'email') {
          params[key] = req.body[key].toLowerCase();
        } else {
          params[key] = req.body[key];
        }
      }
    }

    if (model === 'users') {
      if (params.email) {
        assert = await action.find(model,{where: {email: params.email}});
        console.log(assert);
        assert.length !== 0 ? res.json(400, 'Email busy'): '';
      }
      if (params.name) {
        assert = await action.find(model, {where: {name: params.name}});
        assert.length !== 0 ? res.json(400, 'Name busy'): '';
      }
    } else if (!req.id) {
      res.json(401, 'Token required');
    } else {
      params.owner = req.id;
    }

    if (model === 'likes') {
      assert = await action.find(model, {where: {comment: params.comment, owner: params.owner}});
      if (assert.length > 0) {
        await action.destroy(model, {id: assert[0].id});
        res.json(200, 'Sucess deleted');
      }
    }

    result =  await action.create(model,params);

    if (result) {
      if (result.name === 'UsageError') {
        res.json(400,'Missed parameters');
      } else if (result.name === 'AdapterError') {
        res.serverError();
      } else {
        res.json(201, 'Success created');
      }
    } else {
      res.badRequest();
    }
  },


  delete: async(req, res) => {
    let result;
    let model;
    let where = {};

    if (req.params.id) {
      where.id = req.params.id;
    } else {
      res.badRequest();
    }

    if (req.params.model) {
      model = req.params.model;
    }

    result = await action.find(model,{where});

    if (result.length === 0) {
      res.badRequest();
    } else {
      if (model === 'users' && result[0]['id'] !== req.id) {
        res.json(300, 'Access denied');
      } else if (result[0]['owner'] && result[0]['owner'] !== req.id) {
        res.json(300, 'Access denied');
      } else {
        await action.destroy(model,where);
        res.json(200, 'Sucess deleted');
      }
    }
  },


  patch: async(req, res) => {
    let assert;
    let result;
    let model;
    let where = {};
    let params = {};

    if (req.params.id) {
      where.id = req.params.id;
    } else {
      res.badRequest();
    }

    if (req.params.model) {
      model = req.params.model;
    }

    if (Object.keys(req.body).length !== 0) {
      for (key in  req.body) {
        if (key === 'name') {
          params[key] = req.body[key].toLowerCase();
        } else if (key === 'email') {
          continue;
        } else {
          params[key] = req.body[key];
        }
      }
    } else {
      res.json(400,'Missed parameters');
    }

    result = await action.find(model,{where});

    if (result.length === 0) {
      res.badRequest();
    } else {
      if (model === 'users') {
        if (result[0]['id'] !== req.id) {
          res.json(300, 'Access denied');
        } else if (params.name) {
          assert = action.find(model, {name: params.name});
          assert.length !== 0 ? res.json(400, 'Name busy'): '';
        } else {
          await action.update(model,where,params);
          res.json(200, 'Sucess updated');
        }
      } else if (result[0]['owner'] && result[0]['owner'] !== req.id) {
        res.json(300, 'Access denied');
      } else {
        await action.update(model,where,params);
        res.json(200, 'Sucess updated');
      }
    }
  },


  login: async(req, res) => {
    let result;
    let params = {};
    if (Object.keys(req.body).length !== 0) {
      for (key in  req.body) {
        if (key === 'email') {
          params[key] = req.body[key].toLowerCase();
        } else {
          params[key] = req.body[key];
        }
      }
    } else {
      res.json(400,'Missed parameters');
    }

    result = await action.login(params);
    if (!result) {
      res.json(401, 'Invalid parameters');
    } else {
      jwt.sign({
        email: params.email,
        id: result,
      }, secretKey,
      {
        expiresIn: '1h'
      }, (error,token) => {
        if (error) {
          return res.serverError();
        }
        if (token) {
          return res.json({token});
        }
      });
    }
  },


  restore: async(req, res) => {
    let result;
    let name;
    if (req.query.name) {
      name = req.query.name.toLowerCase();
    } else {
      res.badRequest('Name required');
    }

    result = await Users.findOne({where: {name},select:['email']});

    let data = {
      from: mailgun_from,
      to: result.email,
      subject: 'Restore password',
      text: `Restore password ${result.password}`
    };

    if (result) {
      mailgun.messages().send(data,(error, body) => {
        if (error) {
          res.serverError();
        }
        if (body) {
          res.json('Check inbox for letter with password');
        }
      });
    } else {
      res.badRequest('Name invalid');
    }
  },


  avatar: async(req, res) => {
    let avatar;
    let uploadOptions = {
      dirname: `${sails.config.appPath}/uploads`,
      maxBytes: 10000000
    };

    if (req.id !== req.params.id) {
      res.json(300, 'Access denied');
    } else {
      req.file('avatar').upload(uploadOptions, async(error, file) => {
        if (error) {
          return res.serverError();
        } else {
          if (file.length === 0) {
            return res.badRequest('No file was uploaded');
          } else if (file[0].type !== 'image/jpeg' || file[0].type !== 'image/png') {
            res.badRequest('Only images allowed');
          } else {
            let tmpArr = file[0].fd.split('/');
            avatar = tmpArr[tmpArr.length - 1];
            await action.update('users',{id:req.id},{avatar});
            res.json(201, 'Avatar uploaded');
          }
        }
      });
    }
  }
};
