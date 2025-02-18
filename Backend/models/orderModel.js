import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    table: {type : String, required: true, unique: true},

    items: [{String,
    description: String,
    price: Number}],
    
    status: {type: String, default: 'pending'},
    createdAt: { type: Date, default: Date.now}
},{minimize:false})

const orderModel = mongoose.models.order || mongoose.model('order',orderSchema);

export default orderModel;