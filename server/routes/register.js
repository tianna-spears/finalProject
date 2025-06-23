const express = require('express');
const router = express.Router()
const registerUser = require('../controllers/register');

router.post('/', registerUser)

// register new user and save to database
// form contains the following:
    // first name
    // last name
    // email
    // password
// Register is Create in CRUD

// is user already in database? (validation logic)

module.exports = router;