const express = require('express')
const router = express.Router()
const stripeController = require('../controllers/stripe')

router.post('/payment', stripeController.payment)

module.exports = router