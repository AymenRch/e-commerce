import express from 'express';
import supabase from '../config/db.js';
import { createOrder } from '../controllers/orderController.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/create-order/:token',createOrder )

router.post('/add/:token', async (req, res) => {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.id;

    const { product, selectedSize } = req.body;
    const product_id = product.id;

    const response = await supabase
        .from('cart')
        .insert({
            user_id: user_id,
            product_id: product_id,
            size: selectedSize
        });
        if (response.error) {
            console.error('Error adding item to cart:', response.error.message);
            return res.status(500).json({ error: response.error.message });
        }
    return res.status(201).json({ message: 'Item added to cart successfully', data: response.data });
})

export default router;