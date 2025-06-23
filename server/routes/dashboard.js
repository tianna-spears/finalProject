const express = require('express')
const router = express.Router()
const  getDashboard = require('../controllers/dashboard')

// get dashboard page based on user?
// display dashboard only if user is logged in (authentication)


router.get('/', getDashboard)

module.exports = router;