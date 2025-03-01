import express from "express";
import {addTransaction, getAllTransactions,getDailySummary} from "../controllers/transactionController.js";

const transactionRouter = express.Router();


transactionRouter.post("/", addTransaction);
transactionRouter.get("/", getAllTransactions);
transactionRouter.get("/summary/daily/:date", getDailySummary);

export default transactionRouter;


