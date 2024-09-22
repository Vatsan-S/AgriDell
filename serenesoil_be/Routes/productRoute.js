import express from 'express'
import { addProduct, editProduct, listProduct, removeProduct } from '../Controllers/productController.js'


const productRouter = express.Router()

productRouter.post("/add", addProduct)
productRouter.get('/list', listProduct)
productRouter.post('/deleteProduct', removeProduct)
productRouter.post('/editProduct', editProduct)

export default productRouter
