import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: {type: String, required: true, unique:true},
    password: {type : String, required: true},
},{minimize:false})

const staffModel = mongoose.models.staff || mongoose.model('staff',staffSchema);

export default staffModel;