import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import itemsRoute from './routes/itemsRoute.js';
import orderRoute from './routes/orderRoute.js';
dotenv.config();
import path from 'path';



const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth',authRoute);
app.use('/items',itemsRoute);
app.use('/orders',orderRoute);

// Serve static files from the "uploads" folder
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    console.log(`Contact form submitted: ${name}, ${email}, ${message}`);

    res.status(200).json({ message: 'Message sent successfully' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})