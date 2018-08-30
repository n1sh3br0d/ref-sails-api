const jwt = require('jsonwebtoken');
const secretKey = sails.config.custom.secretKey;

module.exports = async(req, res, proceed) => {
  let token;

  let page = 1;
  if (Object.keys(req.query).length !== 0) {
    if (req.query.page && parseInt(req.query.page) > 1) {
      page = parseInt(req.query.page);
    }
    if (req.query.limit && parseInt(req.query.limit) > 0) {
      req.limit = req.query.limit;
    }
    if (req.query.api) {
      token = req.query.api;
    }
  }

  if (page > 1) {
    req.skip = (page - 1) * req.limit;
  } else {
    req.skip = 0;
  }


  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return proceed();
  }

  await jwt.verify(token, secretKey, (error, decode) => {
    if (error) {
      if (error.name === 'TokenExpiredError') {
        return res.json(401,'Token expired, please relogin');
      } else {
        return res.json(401, 'Invalid token');
      }
    }
    if (decode) {
      req.id = decode.id;
      return proceed();
    }
  });

};
