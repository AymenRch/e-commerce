import { userRegister, userLogin, userLogout } from '../models/userModel.js'; // adjust path if needed

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
