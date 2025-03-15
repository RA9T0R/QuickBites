import tableModel from "../models/tableModel.js";

const addTable = async (req, res) => {
  try {
    const { table } = req.body;

    // Check if the table number is valid (must be a number)
    if (!table || isNaN(table)) {
      return res.json({
        success: false,
        message: "Invalid table number.",
      });
    }

    // Check if table already exists
    let existingTable = await tableModel.findOne({ table });
    if (existingTable) {
      return res.json({
        success: false,
        message: "Table already exists.",
      });
    }

    // Create new table with no users and set as unavailable
    const newTable = new tableModel({ table, users: [], available: false, callWaiter: false });
    await newTable.save();

    res.json({
      success: true,
      message: `Table ${table} has been created.`,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const joinTable = async (req, res) => {
  try {
    const { table } = req.body;

    let tableData = await tableModel.findOne({ table });

    if (!tableData) {
      return res.json({
        success: false,
        message: `Table ${table} does not exist.`,
      });
    }

    if (!tableData.available) {
      return res.json({
        success: false,
        message: `This table ${table} is not available.`,
      });
    }

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let newUserID = alphabet[tableData.users.length] || `U${tableData.users.length + 1}`;

    if (tableData.users.includes(newUserID)) {
      tableData.users = tableData.users.filter((userID) => userID !== newUserID);
      console.log(`Removed existing user : ${newUserID}`);
    }

    tableData.users.push(newUserID);
    await tableData.save();

    res.json({
      success: true,
      userID: tableData.users[tableData.users.length - 1],
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const availableTable = async (req, res) => {
  try {
    const { table, available } = req.body;

    let tableData = await tableModel.findOne({ table });

    if (!tableData) {
      return res.json({
        success: false,
        message: "Table not found.",
      });
    }

    tableData.available = available;
    await tableData.save();

    res.json({
      success: true,
      message: `Table ${table} is now ${available ? "open" : "closed"}.`,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const clearTable = async (req, res) => {
  try {
    const { table } = req.body;

    let tableData = await tableModel.findOne({ table });

    if (!tableData) {
      return res.json({
        success: false,
        message: "Table not found.",
      });
    }

    // Clear users and set availability to false
    tableData.users = [];
    tableData.available = false;
    tableData.callWaiter = false; // Reset callWaiter flag
    await tableData.save();

    res.json({
      success: true,
      message: `Table ${table} has been cleared.`,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listTables = async (req, res) => {
  try {
    let tables = await tableModel.find({});
    res.json({ success: true, tables });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getTable = async (req, res) => {
  try {
    const { table } = req.query;

    let tableData = await tableModel.findOne({ table });

    if (!tableData) {
      return res.json({
        success: false,
        message: "Table not found.",
      });
    }

    if (!tableData.available) {
      return res.json({
        success: false,
        message: "Table is not available.",
      });
    }

    res.json({
      success: true,
      table: tableData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteTable = async (req, res) => {
  try {
    const { tableNumber } = req.body;

    const table = await tableModel.findOne({ table: tableNumber });

    if (!table) {
      return res.json({
        success: false,
        message: `Table with number ${tableNumber} not found.`,
      });
    }

    await tableModel.deleteOne({ table: tableNumber });

    return res.json({
      success: true,
      message: `Table ${tableNumber} has been deleted successfully.`,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// New callWaiter function
const callWaiter = async (req, res) => {
  try {
    const { table } = req.body;

    let tableData = await tableModel.findOne({ table });

    if (!tableData) {
      return res.json({
        success: false,
        message: `Table ${table} does not exist.`,
      });
    }

    // Set the callWaiter flag to true
    tableData.callWaiter = true;
    await tableData.save();

    res.json({
      success: true,
      message: `A waiter has been notified for table ${table}.`,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const attendToCall = async (req, res) => {
  try {
    const { table } = req.body;

    let tableData = await tableModel.findOne({ table });

    if (!tableData) {
      return res.json({
        success: false,
        message: `Table ${table} does not exist.`,
      });
    }

    tableData.callWaiter = false;
    await tableData.save();

    res.json({
      success: true,
      message: `The waiter has attended to the call for table ${table}.`,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export {
  addTable,
  joinTable,
  availableTable,
  clearTable,
  listTables,
  deleteTable,
  getTable,
  callWaiter,
  attendToCall
};
