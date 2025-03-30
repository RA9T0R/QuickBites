import analyticsModel from "../models/analyticsModel.js";
import tableModel from "../models/tableModel.js";

//  function for add transaction
const addTransaction = async (req, res) => {
  try {
    const { products,table } = req.body;

    let totalIncome = 0, orderAmount = 0;
    const FoodData = products.map(product => {
      const { id, name, quantity, totalPrice, image } = product;
      totalIncome += totalPrice;
      orderAmount++;
      return {
        image,
        id,
        name,
        quantitySold: Number(quantity),
      };
    });

    let tableData = await tableModel.findOne({ table: table });

    const customerAmount = tableData ? tableData.users.length : 1;

    const SalesData = {
      date: new Date().toISOString(),
      totalIncome,
      OrderFood: FoodData,
      orderAmount,
      customerAmount,
    };

    console.log(SalesData);

    const sales = new analyticsModel(SalesData);
    await sales.save();

    res.json({ success: true, message: "Clear Order & Save Data" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// function for get analytics data
const getAnalyticsData = async (req, res) => {
  try {
    const { dateRange } = req.query;

    let filter = {};

    // Create a date filter based on the dateRange
    if (dateRange === "daily") {
      const now = new Date();
      
      const offset = 7 * 60; 
      const localStartOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      const localEndOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    
      const startOfDay = new Date(localStartOfDay.getTime() - offset * 60 * 1000).toISOString();
      const endOfDay = new Date(localEndOfDay.getTime() - offset * 60 * 1000).toISOString();
    
      filter.date = { $gte: startOfDay, $lt: endOfDay };
    }else if (dateRange === "monthly") {
      const firstDayOfMonth = new Date();
      firstDayOfMonth.setDate(1);

      const lastDayOfMonth = new Date(firstDayOfMonth);
      lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);
      lastDayOfMonth.setDate(0);

      filter.date = { $gte: firstDayOfMonth.toISOString(), $lt: lastDayOfMonth.toISOString() };

    } else if (dateRange === "yearly") {
      const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
      const lastDayOfYear = new Date(new Date().getFullYear() + 1, 0, 0);

      filter.date = { $gte: firstDayOfYear.toISOString(), $lt: lastDayOfYear.toISOString() };
    }

    const analyticsData = await analyticsModel.find(filter).sort({ date: 1 });

    if (!analyticsData.length) {
      return res.json({ success: false, message: "No data found" });
    }

    res.json({ success: true, sales: analyticsData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {addTransaction,getAnalyticsData};