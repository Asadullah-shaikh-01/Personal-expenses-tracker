import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
//files
import { connectDB } from './db/db.js';
import transactionsRoutes from './routes/transactionsRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config();
const app = express();

const PORT = process.env.PORT || 1003;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
}));
app.use(morgan('dev')); // Log HTTP requests

// Routes
app.use('/api/v1', transactionsRoutes)
app.use('/api/v1/user', userRoutes);



app.get('/', (req, res) => {
    res.status(200).send({
        success: true,
        message: "Server started successfully!",
    });
});



// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectDB();
});
