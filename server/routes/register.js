const express = require('express');
const router = express.Router()
const registerUser = require('../controllers/register');

// router.post('/', registerUser)

router.post('/', (req, res, next) => {
  console.log("Register route hit");
  registerUser(req, res, next);
});

// router.post('/register', registerUser)


module.exports = router;