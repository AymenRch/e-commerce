import express from 'express'
import { registerController, loginController, logoutController, checkCartController, getCartController } from '../controllers/userController.js'
import {updateQuantityController} from '../controllers/orderController.js'
import supabase from '../config/db.js'

const router = express.Router()

router.post('/register',registerController)
router.post('/login',loginController)
router.post('/logout',logoutController)
router.post('/check-cart/:token', checkCartController)
router.get('/cart/:token', getCartController)
router.put('/update-cart', updateQuantityController)

export default router