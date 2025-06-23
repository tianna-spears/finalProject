const express = require('express')
const router = express.Router()
const getUsers = require('../controllers/login')

// Login in is READ in CRUD
// get email and get password from Login Form (POST)
// just need to find the user in the database
//and check if information is correct

router.post('/', getUsers)

module.exports = router;