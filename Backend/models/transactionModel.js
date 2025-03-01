import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    date: { type: String, required: true }, 
    time: { type: String, required: true} ,
    type: { type: String, enum: ["income","expense"] },
    amount: { type: Number, required: true },
    description: { type: String, required: true }

});


const transactionModel = mongoose.models.transaction || mongoose.model('Transaction', TransactionSchema);

export default transactionModel;
