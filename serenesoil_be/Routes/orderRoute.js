import express from 'express'
import { createOrder, fetchAllOrder, fetchOrder, placeOrder, statusChange } from '../Controllers/orderController.js'
import authMiddleware from '../Middleware/auth.js'

const orderRoute = express.Router()
orderRoute.post('/placeOrder', placeOrder)
orderRoute.post('/createOrder',createOrder)
orderRoute.get('/fetchOrders', authMiddleware, fetchOrder)
orderRoute.get('/allOrders',  fetchAllOrder)
orderRoute.post('/changeStatus', statusChange)
export default orderRoute