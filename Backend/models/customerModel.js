import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true},
    table: {type : String, required: true},
    QRcode: {type : Object, default:{}}
},{minimize:false})

const customerModel = mongoose.models.customer || mongoose.model('customer',customerSchema);

export default customerModel;
