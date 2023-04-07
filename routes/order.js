const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order')
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuth } = require('../config/auth')

router.post('/newOrder', verifyToken, orderController.newOrder)
router.get('/getAllOrders', verifyTokenAndAdmin, orderController.getAllOrders)
router.get('/find/:userId', verifyTokenAndAuth, orderController.getUserOrders)
router.get('/monthlyIncome', verifyTokenAndAdmin, orderController.getMonthlyStats)
router.put('/updateOrder/:id', verifyTokenAndAdmin, orderController.updateOrder)
router.delete('/deleteOrder/:id', verifyTokenAndAdmin, orderController.deleteOrder)

module.exports = router