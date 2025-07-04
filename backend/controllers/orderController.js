import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import {createOrder as createOrderModel, addItemToOrder, update} from '../models/ordersModel.js';

export async function createOrder(req,res){

    const {token} = req.params;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.id
    const { total, shipping_address, wilaya, ZIP_CODE, notes, phone } = req.body;

    try {
        const order = await createOrderModel(user_id, total, shipping_address, wilaya, ZIP_CODE, notes, phone);
        if (order.error) {
            console.error('Error creating order:', order.error);
            return res.status(500).json({ error: order.error });
        }

        for (const item of req.body.items) {
            const addItem = await addItemToOrder(order.data.id, item.product.id, item.quantity, item.selectedSize);
            if (addItem.error) {
                console.error('Error adding item to order:', addItem.error);
                return res.status(500).json({ error: addItem.error });
            }
        }

        return res.status(201).json({ message: 'Order created successfully', order: order.data });

        
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ error: 'Internal server error' });
        
    }
}

export async function updateQuantityController(req, res) {
    const { id , action } = req.body;
    try {
        const result = await update(id, action);
        if( result.error) {
            console.error('Error updating quantity:', result.error);
            return res.status(500).json({ error: result.error });
        }
        console.log('Quantity updated successfully:', result.data);
        return res.status(200).json({ message: 'Quantity updated successfully', data: result.data });
    } catch (error) {
        console.error('Error updating quantity:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}
 