const router = require('express').Router();

const AuthModel = require('./auth-model.js');

router.post('/register', (req, res) => {
  const { body } = req;

  AuthModel.insert(body)
    .then(user => {
      res.status(201).json({ message: `Welcome ${user.username}, your account has been created!` });
    })
    .catch(err => {
      res.status(500).json({ message: "error adding user" });
    })
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
