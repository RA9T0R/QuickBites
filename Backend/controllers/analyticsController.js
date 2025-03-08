import analyticsModel from "../models/analyticsModel.js";

//  เพิ่มรายการรายรับ-รายจ่าย
const addTransaction = async (req, res) => {
  try {
    const { products } = req.body;

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

    const SalesData = {
      date: new Date().toISOString(),
      totalIncome,
      OrderFood: FoodData,
      orderAmount,
      customerAmount: 1,
    };

    console.log(SalesData);

    const sales = new analyticsModel(SalesData);
    await sales.save();

    res.json({ success: true, message: "Clear Order & Save Data" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// const getAnalyticsData = async (req, res) => {
//   try {
//     const analyticsData = await analyticsModel.find().sort({ date: 1 }); // Sort by ascending date

//     if (!analyticsData.length) {
//       return res.json({ success: false, message: "No data found" });
//     }

//     res.json({ success: true, sales: analyticsData });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

const getAnalyticsData = async (req, res) => {
  try {
    const { dateRange } = req.query;

    let filter = {};

    // Create a date filter based on the dateRange
    if (dateRange === "daily") {
      const today = new Date();
      
      // Start of the day in local time (assuming GMT+7, adjust for your timezone)
      const localStartOfDay = new Date(today.setHours(0, 0, 0, 0));

      // End of the day in local time
      const localEndOfDay = new Date(today.setHours(23, 59, 59, 999));

      // Adjust the start and end of the day based on timezone (GMT+7)
      const offset = 7 * 60; // GMT+7 in minutes
      const startOfDay = new Date(localStartOfDay.getTime() + offset * 60 * 1000).toISOString();
      const endOfDay = new Date(localEndOfDay.getTime() + offset * 60 * 1000).toISOString();

      // Apply filter for daily range
      filter.date = { $gte: startOfDay, $lt: endOfDay };

    } else if (dateRange === "monthly") {
      const firstDayOfMonth = new Date();
      firstDayOfMonth.setDate(1);

      const lastDayOfMonth = new Date(firstDayOfMonth);
      lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);
      lastDayOfMonth.setDate(0); // Get the last date of the current month

      filter.date = { $gte: firstDayOfMonth.toISOString(), $lt: lastDayOfMonth.toISOString() };

    } else if (dateRange === "yearly") {
      const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
      const lastDayOfYear = new Date(new Date().getFullYear() + 1, 0, 0);

      filter.date = { $gte: firstDayOfYear.toISOString(), $lt: lastDayOfYear.toISOString() };
    }

    // Fetch analytics data from MongoDB using the constructed filter
    const analyticsData = await analyticsModel.find(filter).sort({ date: 1 });

    if (!analyticsData.length) {
      console.log("No data found for filter:", filter);
      return res.json({ success: false, message: "No data found" });
    }

    // Return data if found
    res.json({ success: true, sales: analyticsData });
  } catch (error) {
    console.log("Error:", error);
    res.json({ success: false, message: error.message });
  }
};


export {addTransaction,getAnalyticsData};

