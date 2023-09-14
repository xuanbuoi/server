const express = require('express')
const router = express.Router()
const ProductCtrl = require('../controllers/productCtrl')

router.get('/products', ProductCtrl.getProducts)
router.get('/products/:id', ProductCtrl.getProduct)
router.post('/products/create', ProductCtrl.createProduct)
router.put('/products/:id', ProductCtrl.updateProduct)
router.delete('/products/:id', ProductCtrl.deleteProduct)

module.exports = router
