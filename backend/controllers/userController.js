import { userRegister, userLogin, userLogout, checkCart, getCart } from '../models/userModel.js'; 
import jwt from 'jsonwebtoken';

export async function registerController(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const result = await userRegister(name, email, password);

    if (result.error) {
        return res.status(400).json({ error: result.error });
    }

    return res.status(201).json({ message: 'User registered successfully.', user: result.data });
}

export async function loginController(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const result = await userLogin(email, password);

    if (result.error) {
        return res.status(401).json({ error: result.error });
    }

    return res.status(200).json({
        message: 'Login successful.',
        user: result.data.user,
        token: result.data.token
    });
}

export async function logoutController(req, res) {
    const result = await userLogout();

    if (result.error) {
        return res.status(500).json({ error: result.error });
    }

    return res.status(200).json({ message: result.data });
}

export async function checkCartController(req, res) {

    const {token} = req.params;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user_id = decoded.id
        const { product_id } = req.body;

        try {
            const cartCheck = await checkCart(user_id, product_id);
            if (cartCheck.error) {
                console.error('Error checking cart:', cartCheck.error);
                return res.status(500).json({ error: cartCheck.error });
            }
            console.log('Cart check data:', cartCheck.data.length);
            const isInCart = cartCheck.data.length > 0
            if( isInCart > 0) {
                return res.status(200).json({ message: 'Product is in the cart'});
            }
            return res.status(201).json({ message: 'Product is not in the cart'});

        } catch (error) {
            console.log('Error checking cart:', error);
            return res.status(500).json({ error: 'Internal server error' });
            
        }

}

export async function getCartController(req, res) {
    const {token} = req.params;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.id

    try {
        const cartData = await getCart(user_id);
        if (cartData.error) {
            console.error('Error fetching cart:', cartData.error);
            return res.status(500).json({ error: cartData.error });
        }

        return res.status(200).json({ data: cartData.data });
    } catch (error) {
        console.error('Unexpected error while fetching cart:', error);
        return res.status(500).json({ error: 'Something went wrong while fetching the cart.' });
    }
}