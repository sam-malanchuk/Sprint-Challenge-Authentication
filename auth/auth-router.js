const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const AuthModel = require('./auth-model.js');

router.post('/register', (req, res) => {
  const { body } = req;
  body.password = bcrypt.hashSync(body.password, 6);

  AuthModel.insert(body)
    .then(createdUser => {
      if(createdUser) {
        const token = generateToken(createdUser);
        res.status(201).json({
          message: `Welcome ${createdUser.username}, your account has been created!`,
          token
        });
      } else {
        res.status(500).json({ message: "Account could not be created" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error creating account" });
    })
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  AuthModel.findBy({username}).first()
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `You are logged in ${user.username}`,
        token
      });
    } else {
      res.status(401).json({ message: "Username or password incorrect" });
    }
  })
  .catch(err => {
    res.status(500).json({ message: "Server Login Error" });
  })
});

function generateToken(user) {
    const payload = {
      sub: user.id,
      username: user.username
    };
    const options = {
      expiresIn: '1d'
    };
    return jwt.sign(payload, "the key should never be hardcoded", options); // hardcoding the key just as an example
}

module.exports = router;
