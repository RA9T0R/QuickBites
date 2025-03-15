import tableModel from "../models/tableModel.js";

const addTable = async (req, res) => {
    try {
        const { table } = req.body;

        // Check if table already exists
        let existingTable = await tableModel.findOne({ table });
        if (existingTable) {
            return res.status(400).json({ success: false, message: "Table already exists." });
        }

        // Create new table with no users and set as unavailable
        const newTable = new tableModel({ table, users: [], available: false });
        await newTable.save();

        res.json({ success: true, message: `Table ${table} has been created.` });
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
            tableData = new tableModel({ table, users: ["A"], available: true });
        } else {
            if (!tableData.available) {
                return res.json({ success: false, message: `This table ${table} is not available.` });
            }

            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let newUserID = alphabet[tableData.users.length] || `U${tableData.users.length + 1}`;

            if (tableData.users.includes(newUserID)) {
                tableData.users = tableData.users.filter(userID => userID !== newUserID);
                console.log(`Removed existing user : ${newUserID}`);
            }

            tableData.users.push(newUserID);
        }

        await tableData.save();
        res.json({ success: true, userID: tableData.users[tableData.users.length - 1] });
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
            return res.status(404).json({ success: false, message: "Table not found." });
        }

        tableData.available = available;
        await tableData.save();

        res.json({ success: true, message: `Table ${table} is now ${available ? "open" : "closed"}.` });
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
            return res.status(404).json({ success: false, message: "Table not found." });
        }

        // Clear users and set availability to false
        tableData.users = [];
        tableData.available = false;

        await tableData.save();

        res.json({ success: true, message: `Table ${table} has been cleared.` });
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

const deleteTable = async (req, res) => {
    try {
    const { tableNumber } = req.body;

      const table = await tableModel.findOne({ table: tableNumber });
  
      if (!table) {
        return res.status(404).json({
          success: false,
          message: `Table with number ${tableNumber} not found.`,
        });
      }
  
      await tableModel.deleteOne({ table: tableNumber });
  
      return res.status(200).json({
        success: true,
        message: `Table ${tableNumber} has been deleted successfully.`,
      });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
  };



export {addTable,joinTable,availableTable,clearTable,listTables,deleteTable}