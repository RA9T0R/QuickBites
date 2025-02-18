import express from "express";
import orderModel from "../models/orderModel.js";
const router = express.Router();


router.post('/order',async (req,res) =>{
    try {
        const
        {table,items} = req.body;
        const order = new Order({table,items});

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
});

router.get('/order/:table', async (req,res)=> {
    try {
        const orders = await Order.find({table: req.params.table});
        res.json(orders);

    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
});

router.put('/order/:id', async (req,res)=> {
    try {
        const {status} = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, {status},{new: true});
        res.json(order);
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
});
export default router;
