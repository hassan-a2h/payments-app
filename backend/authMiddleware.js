const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req, res, next) {
  if (!req.cookies.Authorization) {
    return res.status(401).send({
      message: 'Access denied'
    });
  }

  const token = req.cookies.Authorization.split(' ')[1];
  
  const userId = jwt.verify(token, process.env.JWT_SECRET);

  if (!userId) {
    return res.status(401).send({
      message: 'Invalid access token'
    });
  }

  next();
}

module.exports = authMiddleware;