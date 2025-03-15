import express from "express";
import {addTable,joinTable,availableTable,clearTable,listTables,deleteTable,getTable,callWaiter,attendToCall} from '../controllers/tableController.js'

const tableRouter = express.Router();

tableRouter.post('/add' , addTable);
tableRouter.post('/join' , joinTable);
tableRouter.post('/available',availableTable);
tableRouter.post('/clear',clearTable);
tableRouter.post('/delete',deleteTable);
tableRouter.post('/call',callWaiter);
tableRouter.post('/attend',attendToCall);
tableRouter.get('/list',listTables);
tableRouter.get('/get',getTable);

export default tableRouter;