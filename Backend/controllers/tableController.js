import tableModel from "../models/tableModel.js";

// function for add table
const addTable = async (req, res) => {
  try {
    const { table } = req.body;

    if (!table || isNaN(table)) {
      return res.json({success: false,message: "Invalid table number.",});
    }

    let existingTable = await tableModel.findOne({ table });
    if (existingTable) {
      return res.json({success: false,message: "Table already exists.",
      });
    }

    const newTable = new tableModel({ table, users: [], available: false, callWaiter: false });
    await newTable.save();

    res.json({success: true,message: `Table ${table} has been created.`,});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// function for join table
const joinTable = async (req, res) => {
  try {
    const { table } = req.body;

    let tableData = await tableModel.findOne({ table });

    if (!tableData) {
      return res.json({success: false,message: `Table ${table} does not exist.`,});
    }

    if (!tableData.available) {
      return res.json({success: false,message: `This table ${table} is not available.`,});
    }

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    // If the user is already in the table, return the existing userID
    if (req.body.userID && tableData.users.includes(req.body.userID)) {
      return res.json({success: true,userID: req.body.userID});
    }

    let newUserID = alphabet[tableData.users.length] || `U${tableData.users.length + 1}`;

    if (tableData.users.includes(newUserID)) {
      tableData.users = tableData.users.filter((userID) => userID !== newUserID);
    }

    tableData.users.push(newUserID);
    await tableData.save();

    res.json({success: true,userID: newUserID,});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// function for check available table
const availableTable = async (req, res) => {
  try {
    const { table, available } = req.body;
    let tableData = await tableModel.findOne({ table });

    if (!tableData) {
      return res.json({success: false,message: "Table not found.",});
    }

    tableData.available = available;
    await tableData.save();

    res.json({success: true,message: `Table ${table} is now ${available ? "open" : "closed"}.`,});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// function for clear table
const clearTable = async (req, res) => {
  try {
    const { table } = req.body;
    let tableData = await tableModel.findOne({ table });

    if (!tableData) {
      return res.json({success: false, message: "Table not found."});
    }

    tableData.users = [];
    tableData.available = false;
    tableData.callWaiter = false; 
    await tableData.save();

    res.json({success: true,message: `Table ${table} has been cleared.`,});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// function for list tables
const listTables = async (req, res) => {
  try {
    let tables = await tableModel.find({});
    res.json({ success: true, tables });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const deleteTable = async (req, res) => {
  try {
    const { tableNumber } = req.body;
    const table = await tableModel.findOne({ table: tableNumber });

    if (!table) {
      return res.json({success: false,message: `Table with number ${tableNumber} not found.`,});
    }

    await tableModel.deleteOne({ table: tableNumber });

    return res.json({success: true,message: `Table ${tableNumber} has been deleted successfully.`,});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// function for call waiter
const callWaiter = async (req, res) => {
  try {
    const { table } = req.body;
    let tableData = await tableModel.findOne({ table });

    if (!tableData) {
      return res.json({success: false,message: `Table ${table} does not exist.`,});
    }

    tableData.callWaiter = true;
    await tableData.save();

    res.json({success: true,message: `A waiter has been notified for table ${table}.`,});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for attend to call
const attendToCall = async (req, res) => {
  try {
    const { table } = req.body;
    let tableData = await tableModel.findOne({ table });

    if (!tableData) {
      return res.json({success: false,message: `Table ${table} does not exist.`,});
    }

    tableData.callWaiter = false;
    await tableData.save();

    res.json({success: true,message: `The waiter has attended to the call for table ${table}.`,});
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
  callWaiter,
  attendToCall
};