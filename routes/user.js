const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const { verifyTokenAndAuth, verifyTokenAndAdmin } = require('../config/auth')

router.get('/find/:id', verifyTokenAndAdmin, userController.getUser)
router.get('/findAll', verifyTokenAndAdmin, userController.getAllUsers)
router.get('/stats', verifyTokenAndAdmin, userController.getUserStats)
router.put('/update/:id', verifyTokenAndAuth, userController.updateUser)
router.delete('/delete/:id', verifyTokenAndAuth, userController.deleteUser)

module.exports = router