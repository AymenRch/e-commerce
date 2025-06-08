import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import itemsRoute from './routes/itemsRoute.js';
dotenv.config();
import path from 'path';



const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth',authRoute);
app.use('/items',itemsRoute);

// Serve static files from the "uploads" folder
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})