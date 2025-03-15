import express from "express";
import {addTable,joinTable,availableTable,clearTable,listTables,deleteTable} from '../controllers/tableController.js'

const tableRouter = express.Router();

tableRouter.post('/add' , addTable);
tableRouter.post('/join' , joinTable);
tableRouter.post('/available',availableTable);
tableRouter.post('/clear',clearTable);
tableRouter.post('/delete',deleteTable);
tableRouter.get('/list',listTables);

export default tableRouter;