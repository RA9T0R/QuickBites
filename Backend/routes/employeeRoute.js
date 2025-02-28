import express from 'express';
import upload from "../middleware/multer.js";
import { registerStaff,login,updateStaff,deleteStaff } from '../controllers/staffController.js';
import adminAuth from "../middleware/adminAuthen.js"

const employeeRouter = express.Router();

// employeeRouter.post('/admin', adminLogin);
// employeeRouter.post('/loginStaff', loginStaff);
employeeRouter.post( "/registerStaff",adminAuth,upload.fields([{ name: "profilePic", maxCount: 1 }]),registerStaff);
employeeRouter.post('/login', login);
employeeRouter.post('/updateStaff',upload.fields([{name:'profilePic',maxCount:1}]),updateStaff);
employeeRouter.post('/removeStaff',deleteStaff);

export default employeeRouter;