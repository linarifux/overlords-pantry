import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; // We will build this next
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import cookieParser from 'cookie-parser'; // <-- Import
import userRoutes from './routes/userRoutes.js'; // <-- Import
import orderRoutes from './routes/orderRoutes.js'; // <-- Import
import uploadRoutes from './routes/uploadRoutes.js'; 

dotenv.config();

// Connect to Database
connectDB(); 

const app = express();
const port = process.env.PORT;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser()); // <-- Use Cookie Parser

// A test route to prove we are alive
app.get('/', (req, res) => {
  res.send('API is running. The Overlord is watching.');
});

// Import Routes Here (Later)
// app.use('/api/products', productRoutes);

// product route
app.use('/api/products', productRoutes);

// user route
app.use('/api/users', userRoutes); 

// order route
app.use('/api/orders', orderRoutes);

// image upload route
app.use('/api/upload', uploadRoutes);

// paypal check route
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Error Middleware (Must be at the bottom)
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${port}`);
  console.log(`😺 The Overlord is awaiting tribute.`);
});