import orderModel from '../models/orderModel.js';

const addOrder = async (req,res) => {
    try {
        console.log(req.body);

        const { tableNumber,userID,productID,name,price,quantity,requirement} = req.body;

        const totalPrice = Number(price) * Number(quantity);

        const OrderData = {
            tableNumber,
            userID,
            productID,
            name,
            price : Number(price),
            quantity : Number(quantity),
            totalPrice,
            requirement,
            status : 'Ordering',
            createdAt : Date.now()
        }
        console.log(OrderData);
        const order = new orderModel(OrderData);
        await order.save();

        res.json({success:true,message:"Order Added"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const listOrders = async (req,res) => {
    try {
        const order = await orderModel.find({});
        res.json({success:true,order})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const listOrdersByTable = async (req,res) => {
    const { table } = req.params;

    try {
        const orders = await orderModel.find({ table: table });
        if (orders.length === 0) {
            return res.json({ success: false, message: `No orders found for ${table}` });
        }
        res.json({ success: true, orders: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const removeOrder = async (req,res) => {
    try {
        await orderModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Order Removed"})
    }catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const updateOrder = async (req,res) => {
    try{
        const {id,status} = req.body;
        await orderModel.findByIdAndUpdate(id,{status});
        res.json({success:true,message:"Order Updated"});
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {addOrder,listOrders,removeOrder,updateOrder,listOrdersByTable};