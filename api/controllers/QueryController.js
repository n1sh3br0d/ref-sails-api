const redirect = require('./HandleController');

module.exports = {
  create: async(req, res) => {
    let body = {};

    if (req.query) {
      for (key in req.query) {
        if (key === 'api') {
          continue;
        } else {
          body[key] = req.query[key];
        }
      }
    }

    req.body = body;

    if (req.params.model === 'users') {
      req.params.id = 'signup';
    }

    await redirect.post(req, res);
  },


  delete: async(req, res) => {
    let body = {};

    if (req.query) {
      for (key in req.query) {
        if (key === 'api') {
          continue;
        } else {
          body[key] = req.query[key];
        }
      }
    }

    req.body = body;

    await redirect.delete(req, res);
  },


  update: async(req, res) => {
    let body = {};

    if (req.query) {
      for (key in req.query) {
        if (key === 'api') {
          continue;
        } else {
          body[key] = req.query[key];
        }
      }
    }

    req.body = body;

    await redirect.patch(req, res);
  },


  login: async(req, res) => {
    let body = {};

    if (req.query) {
      for (key in req.query) {
        if (key === 'api') {
          continue;
        } else {
          body[key] = req.query[key];
        }
      }
    }

    req.body = body;

    await redirect.login(req, res);
  },


};
