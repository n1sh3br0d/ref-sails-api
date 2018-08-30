const jwt = require('jsonwebtoken');
const secretKey = sails.config.custom.secretKey;

module.exports = async(req, res, proceed) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query.api) {
    token = req.query.api;
  } else {
    res.json(401, 'Token required');
  }

  await jwt.verify(token, secretKey, (error, decode) => {
    if (error) {
      if (error.name === 'TokenExpiredError') {
        return res.json(401,'Token expired, please relogin');
      } else {
        return res.json(401, 'invalid token');
      }
    }
    if (decode) {
      req.id = decode.id;
      return proceed();
    }
  });

};
