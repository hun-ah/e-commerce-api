const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')
const { verifyTokenAndAdmin } = require('../config/auth')

router.get('/find/:id', productController.getProduct)
router.get('/findAll', productController.getAllProducts)
router.get('/search/:id', productController.searchProduct)
router.post('/newProduct', verifyTokenAndAdmin, productController.newProduct)
router.put('/updateProduct/:id', verifyTokenAndAdmin, productController.updateProduct)
router.delete('/deleteProduct/:id', verifyTokenAndAdmin, productController.deleteProduct)

module.exports = router