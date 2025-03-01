import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    tableNumber: { type: String, required: true },
    userID: { type: String, required: true },
    products: [
        {
            id: { type: String, required: true },
            image: { type: [String], required: true },  
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            totalPrice: { type: Number, required: true },
            requirement: { type: String, default: "" },
        }
    ],
    status: { type: String, default: "Ordering" },
    createdAt: { type: Date, default: Date.now }
}, { minimize: false });

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;
