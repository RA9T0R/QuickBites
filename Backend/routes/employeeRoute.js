import express from 'express';
import { adminLogin,registerStaff,loginStaff } from '../controllers/staffController.js';

const employeeRouter = express.Router();

employeeRouter.post('/admin', adminLogin);
employeeRouter.post('/registerStaff', registerStaff);
employeeRouter.post('/loginStaff', loginStaff);

export default employeeRouter;