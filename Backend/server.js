import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/employeeRoute.js';
import productRouter from './routes/productRoute.js';
import orderRouter from './routes/orderRoute.js';
import employeeRouter from './routes/employeeRoute.js';
import transactionRouterouter from './routes/transactionRoute.js';
import transactionRouter from './routes/transactionRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product',productRouter);
app.use('/api/order',orderRouter);
app.use('/api/employee',employeeRouter);
app.use("/api/transactions",transactionRouter)


app.get('/',(req,res)=>{
    res.send("API IS WORK");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

