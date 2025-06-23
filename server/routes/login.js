const express = require('express')
const router = express.Router()
const { getUsers,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/login')

router.get('/', getUsers)
router.post('/', createUser)
router.patch('/', updateUser)
// router.delete('/', deleteUser)

module.exports = router;