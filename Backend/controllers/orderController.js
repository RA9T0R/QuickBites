import orderModel from '../models/orderModel.js';

// function for add order
const addOrder = async (req, res) => {
    try {
        const { tableNumber, userID, products } = req.body;
        const productsArray = JSON.parse(products);
        const productsData = productsArray.map(product => {
            const { id, name, price, quantity, requirement, image } = product;
            const totalPrice = Number(price) * Number(quantity);  
            return {
                id,
                name,
                price: Number(price),
                quantity: Number(quantity),
                totalPrice,
                requirement,
                image, 
            };
        });

        const orderData = {
            tableNumber,
            userID,
            products: productsData, 
            status: 'Ordering',
            createdAt: Date.now(),
        };

        const order = new orderModel(orderData);
        await order.save();

        res.json({ success: true, message: "Order Added" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// function for list order
const listOrders = async (req,res) => {
    try {
        const order = await orderModel.find({});
        res.json({success:true,order})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// function for list order by table
const listOrdersByTable = async (req, res) => {
    const { tableNumber } = req.params;
    try {
      const orders = await orderModel.find({ tableNumber: tableNumber });
  
      if (orders.length === 0) {
        return res.json({ success: false, message: `No orders found for ${tableNumber}` });
      }
  
      const totalFoodCount = orders.reduce((count, order) => {
        order.products.forEach(item => {
          count += item.quantity; // Accumulate the quantity
        });
        return count;
      }, 0);
  
      res.json({ success: true, orders: orders, totalFoodCount: totalFoodCount });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
};
  
// function for remove order
const removeOrder = async (req, res) => {
    try {
        const { tableNumber } = req.body;
        const result = await orderModel.deleteMany({ tableNumber });

        if (result.deletedCount > 0) {
            res.json({ success: true, message: `${result.deletedCount} Orders Removed` });
        } else {
            res.json({ success: false, message: "No orders found for this table number" });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// function for update order
const updateOrder = async (req,res) => {
    try{
        const {id,status} = req.body;
        await orderModel.findByIdAndUpdate(id,{status});
        res.json({success:true,message:"Order Status Updated"});
    }catch(error){
        res.json({success:false,message:error.message})
    }
}

export {addOrder,listOrders,removeOrder,updateOrder,listOrdersByTable};