import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
    table : {type: Number, required: true},
    users : {type: Array, required: true}, 
    available : {type:Boolean,default:false},
    callWaiter: { type: Boolean, default: false }
},{ minimize: false });

const tableModel = mongoose.models.table || mongoose.model('table', tableSchema);

export default tableModel;