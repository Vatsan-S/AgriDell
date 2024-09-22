import express from 'express'
import { addToCart, deleteProduct, removeFromCart } from '../Controllers/chatController.js'
import authMiddleware from '../Middleware/auth.js'
const cartRoute = express.Router()

cartRoute.post('/addToCart',authMiddleware, addToCart)
cartRoute.post('/removeFromCart',authMiddleware, removeFromCart)
cartRoute.post('/deleteFromCart',authMiddleware, deleteProduct)

export default cartRoute