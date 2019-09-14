const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Auth = require('../auth/auth-model.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, "the key should actually be stored in an ENV file", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'not verified', error: err });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    })
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};
