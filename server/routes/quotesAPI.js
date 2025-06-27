const express = require('express')
const router = express.Router()
const getQuotesController = require('../controllers/quotesAPI')

router.get('/', getQuotesController)

module.exports = router;