const express = require('express')
const router = express.Router()
const { getDashboard, getGreeting } = require('../controllers/dashboard')

router.get('/', getDashboard)
router.get('/', getGreeting)
module.exports = router;