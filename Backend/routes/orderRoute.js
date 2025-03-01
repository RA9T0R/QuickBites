import express from "express";
import {addOrder,listOrders,removeOrder,updateOrder,listOrdersByTable} from '../controllers/orderController.js'
import upload from "../middleware/multer.js";

const orderRouter = express.Router();

orderRouter.post('/add',upload.none(),addOrder);
orderRouter.get('/list',listOrders);
orderRouter.get('/list/:tableNumber',listOrdersByTable);
orderRouter.post('/remove',removeOrder);
orderRouter.post('/update',updateOrder);

export default orderRouter;
