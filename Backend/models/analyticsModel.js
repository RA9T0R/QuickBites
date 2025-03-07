import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
    date: { type: String, required: true },
    totalIncome: { type: Number, default: 0 },
    OrderFood: [{
        image: { type: [String], required: true },  
        id: { type: String, required: true },
        name: { type: String, required: true },
        quantitySold: { type: Number, required: true }
    }],
    orderAmount: { type: Number, default: 0 },
    customerAmount: { type: Number, default: 0 },
}, { minimize: false });

const analyticsModel = mongoose.models.analytics || mongoose.model('Analytics', analyticsSchema);

export default analyticsModel;
