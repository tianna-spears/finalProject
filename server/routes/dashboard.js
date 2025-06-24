const express = require('express')
const router = express.Router()
const { getDashboard, displayCourse } = require('../controllers/dashboard')

router.get('/', getDashboard, displayCourse)
module.exports = router;