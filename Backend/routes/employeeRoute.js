import express from 'express';
import { adminLogin,registerStaff,loginStaff,login } from '../controllers/staffController.js';

const employeeRouter = express.Router();

// employeeRouter.post('/admin', adminLogin);
// employeeRouter.post('/loginStaff', loginStaff);
employeeRouter.post('/registerStaff', registerStaff);
employeeRouter.post('/login', login);

export default employeeRouter;