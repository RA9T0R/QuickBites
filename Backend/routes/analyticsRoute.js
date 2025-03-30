import express from "express";
import {addTransaction,getAnalyticsData} from "../controllers/analyticsController.js";

const analyticsRouter = express.Router();

analyticsRouter.post("/add", addTransaction);
analyticsRouter.get("/get", getAnalyticsData);

export default analyticsRouter;


