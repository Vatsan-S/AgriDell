import express from 'express'
import { getUser, login, loginAdmin, register } from '../Controllers/userController.js'
import authMiddleware from '../Middleware/auth.js'

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login',login)
userRouter.get('/getUser',authMiddleware, getUser)
userRouter.post('/loginAdmin', loginAdmin)

export default userRouter
