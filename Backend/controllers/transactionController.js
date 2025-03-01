import Transaction from "../models/transactionModel.js";

//  เพิ่มรายการรายรับ-รายจ่าย
export const addTransaction = async (req, res) => {
  try {
    const { date, time, type, amount, description } = req.body;
    const newTransaction = new Transaction({ date, time, type, amount, description });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  ดึงข้อมูลทั้งหมด
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  ดึงข้อมูลสรุปยอดรายวัน
export const getDailySummary = async (req, res) => {
  try {
    const { date } = req.params;
    const transactions = await Transaction.find({ date });

    const total_income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const total_expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    res.json({
      date,
      total_income,
      total_expense,
      net_profit: total_income - total_expense,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
