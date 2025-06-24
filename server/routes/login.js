const express = require('express')
const router = express.Router()
const userLogin = require('../controllers/login')

// Login in is READ in CRUD
// get email and get password from Login Form (POST)
// does user already exist in database?
// does the user password match the hashed password in database?

router.post('/', userLogin)

module.exports = router;