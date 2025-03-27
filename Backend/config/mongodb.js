import mongoose from 'mongoose';

const connectDB = async (io) => {
    mongoose.connection.on("connected", () => {
        console.log("DB connected");
    });

    await mongoose.connect(`${process.env.MONGOBD_URL}/QuickBites`);

    const changeStreamOrder = mongoose.connection.collection('orders').watch(); 
    const changeStreamTables = mongoose.connection.collection('tables').watch(); 

    changeStreamOrder.on('change', () => {io.emit('orderUpdated'); });
    changeStreamTables.on('change', () => {io.emit('tableUpdated'); });
};

export default connectDB;
