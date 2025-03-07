import express from "express";
import {addTransaction,getAnalyticsData} from "../controllers/analyticsController.js";

const analyticsRouter = express.Router();

analyticsRouter.post("/add", addTransaction);
analyticsRouter.get("/get", getAnalyticsData);
// analyticsRouter.get("/list", getAllTransactions);
// analyticsRouter.get("/summary/daily/:date", getDailySummary);

export default analyticsRouter;


