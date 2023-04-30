const express = require('express')
const router = express.Router()
const {protect} = require('../middlewares/authMiddleware')
const productController = require('../controllers/productController')

router.get('/allproducts',protect,productController.getallProducts)
router.post('/createproduct',protect,productController.createProduct)
router.put('/updateproduct/:id',protect,productController.updateProduct)
router.delete('/deleteproduct/:id',protect,productController.removeProduct);
module.exports = router;