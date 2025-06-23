const express = require('express');
const getUser = require('../controllers/register');
const router = express.Router()

router.get('/', getUser)
// router.get('/', registerUser)

module.exports = router;