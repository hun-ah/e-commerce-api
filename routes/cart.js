const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuth } = require('../config/auth')

router.get('/getUserCart/:userId', verifyTokenAndAuth, cartController.getUserCart)
router.get('/findAll', verifyTokenAndAdmin, cartController.findAllCarts)
router.post('/', verifyToken, cartController.newCart)
router.put('/updateCart/:id', verifyTokenAndAuth, cartController.updateCart)
router.delete('/deleteCart/:id', verifyTokenAndAdmin, cartController.deleteCart)

module.exports = router