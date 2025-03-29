import mongoose from 'mongoose';
import tableModel from "../models/tableModel.js";

const connectDB = async (io) => {
    mongoose.connection.on("connected", () => {
        console.log("DB connected");
    });

    await mongoose.connect(`${process.env.MONGOBD_URL}/QuickBites`);

    const changeStreamOrder = mongoose.connection.collection('orders').watch(); 
    const changeStreamTables = mongoose.connection.collection('tables').watch(); 
    const changeStreamTablesavailable = mongoose.connection.collection('tables').watch(); 

    changeStreamOrder.on('change', () => {io.emit('orderUpdated'); });
    changeStreamTables.on('change', () => {io.emit('tableUpdated'); });
    changeStreamTablesavailable.on('change', async (change) => {
        if (change.updateDescription?.updatedFields?.available !== undefined) {
            try {
                const updatedTable = await tableModel.findById(change.documentKey._id,'table');
                if (!updatedTable) return;
    
                io.emit('tableUpdatedStatus', { 
                    table: updatedTable.table, 
                    available: change.updateDescription.updatedFields.available 
                });
    
            } catch (error) {
                console.error("Error fetching table number : ", error);
            }
        }
    });
    
};

export default connectDB;
