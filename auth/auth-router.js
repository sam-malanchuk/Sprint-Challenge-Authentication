const router = require('express').Router();

router.post('/register', (req, res) => {
  // implement registration
  res.status(201).json({ message: "yo, it's all good" });
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
