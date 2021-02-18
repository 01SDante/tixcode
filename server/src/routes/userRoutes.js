const express = require('express')

const router = express.Router()

const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

// Public routes
router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.use(authController.protect)

// Protected routes
router.get('/', userController.getAll)
router.get('/:id', userController.getOne)

module.exports = router