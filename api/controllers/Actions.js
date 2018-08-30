module.exports = {
  find: async(model, params, userid = '') => {
    let select;
    let result;

    switch(model) {
      case 'users':
        model = Users;
        if (params.where && params.where.id && params.where.id === userid) {
          select = ['name','email','avatar'];
        } else {
          select = ['name','avatar'];
        }
        break;

      case 'topics':
        model = Topics;
        select = ['subject','body','owner'];
        break;

      case 'comments':
        model = Comments;
        select = ['body','topic','owner'];
        break;

      case 'likes':
        model = Likes;
        select = ['comment','owner'];
        break;
    }

    params.select = select;

    try {
      result = await model.find(params);
      return result;
    } catch(error) {
      if (error.name === 'UsageError' || error.name === 'AdapterError') {
        return error;
      }
    }
  },


  create: async(model, params) => {
    let result;

    switch(model) {
      case 'users':
        model = Users;
        break;

      case 'topics':
        model = Topics;
        break;

      case 'comments':
        model = Comments;
        break;
      case 'likes':
        model = Likes;
        break;
    }

    try {
      result = await model.create(params).fetch();
      return result;
    } catch(error) {
      if (error.name === 'UsageError' || error.name === 'AdapterError') {
        return error;
      }
    }
  },


  destroy: async(model, params) => {
    switch(model) {
      case 'users':
        model =  Users;
        break;

      case 'topics':
        model = Topics;
        break;

      case 'comments':
        model = Comments;
        break;
      case 'likes':
        model = Likes;
        break;
    }

    await model.destroy(params).fetch();
  },


  update: async(model, match, params) => {
    let result;
    switch(model) {
      case 'users':
        model =  Users;
        break;

      case 'topics':
        model = Topics;
        break;

      case 'comments':
        model = Comments;
        break;
      case 'likes':
        model = Likes;
        break;
    }

    try {
      result = await model.update(match).set(params).fetch();
      return result;
    } catch (error) {
      if (error.name === 'UsageError' || error.name === 'AdapterError') {
        return error;
      }
    }
  },


  login: async(params) => {
    let result;
    if(!params.email) {
      return false;
    }
    result = await Users.findOne({email: params.email}).decrypt();

    if (result) {
      if (params.password === result.password) {
        return result.id;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


};
