import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/employeeRoute.js';
import productRouter from './routes/productRoute.js';
import orderRouter from './routes/orderRoute.js';
import employeeRouter from './routes/employeeRoute.js';
import analyticsRouter from './routes/analyticsRoute.js';
import tableRouter from './routes/tableRoute.js';
import http from 'http';  
import { Server } from 'socket.io';  
import QRCode from 'qrcode';
import generatePayload from 'promptpay-qr';

const app = express();
const port = process.env.PORT || 4000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: [
        'https://quickbites-dashboard.vercel.app',
        'https://quickbites-website.vercel.app'
      ],
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
      credentials: true
    },
    transports: ['websocket', 'polling'],
    debug: true
});

connectDB(io); 
connectCloudinary();

app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/table', tableRouter);
app.post('/api/promptpay', async (req, res) => {
  try {
    const amount = parseFloat(req.body.amount);
    const mobileNumber = '0944178866';
    const payload = generatePayload(mobileNumber, {amount});

    QRCode.toDataURL(payload, (err, url) => {
        if (err) {
            console.log('Generate QR code error : ', err);
            return res.json({ success: false, message: err.message });
        }
        res.json({ qrImage: url }); 
    });
      
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

io.on('connection', (socket) => {
    console.log(`A user connected : ${socket.id}`);

    socket.on('message', (data) => {
        socket.emit('messageResponse', 'Message received');
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

app.get('/', (req, res) => {
    res.send('API IS WORKING');
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});