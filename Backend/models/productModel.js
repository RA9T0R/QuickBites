import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true }, 
    rate: { type: Number, required: true },
    time: { type: Array, required: true },  
    Kcal: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Number, required: true },  
    recommend: { type: Boolean, default: false }
});

const productModel = mongoose.models.product ||  mongoose.model("product", productSchema);

export default productModel;