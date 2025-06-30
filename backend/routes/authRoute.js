import express from 'express'
import { registerController, loginController, logoutController, checkCartController, getCartController } from '../controllers/userController.js'
import supabase from '../config/db.js'

const router = express.Router()

router.post('/register',registerController)
router.post('/login',loginController)
router.post('/logout',logoutController)
router.post('/check-cart/:token', checkCartController)
router.get('/cart/:token', getCartController)
router.put('/update-cart', async (req, res) => {
    const { id, action } = req.body;
    try {
        // Fetch current quantity
        const { data: cartItem, error: fetchError } = await supabase
            .from('cart')
            .select('quantity')
            .eq('id', id)
            .single();
        if (fetchError || !cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }
        let newQuantity = cartItem.quantity;
        if (action === 'increase') {
            newQuantity += 1;
        } else if (action === 'decrease') {
            newQuantity -= 1;
        } else {
            return res.status(400).json({ error: 'Invalid action' });
        }
        if (newQuantity <= 0) {
            // Remove item from cart
            const { error: deleteError } = await supabase
                .from('cart')
                .delete()
                .eq('id', id);
            if (deleteError) {
                return res.status(500).json({ error: 'Failed to remove cart item' });
            }
            return res.status(200).json({ message: 'Cart item removed' });
        } else {
            // Update quantity
            const { error: updateError } = await supabase
                .from('cart')
                .update({ quantity: newQuantity })
                .eq('id', id);
            if (updateError) {
                return res.status(500).json({ error: 'Failed to update cart' });
            }
            return res.status(200).json({ message: 'Cart updated successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update cart' });
    }
})

export default router