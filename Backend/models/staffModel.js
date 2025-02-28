import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    phone: { type: String, required: false }, 
    profilePic: { type: String, required: false }, 
    address: { type: String, required: false }, 
},{ minimize: false });

const staffModel = mongoose.models.staff || mongoose.model('staff', staffSchema);

export default staffModel;
