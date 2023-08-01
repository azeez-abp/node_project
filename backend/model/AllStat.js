import mongoose from "mongoose";
import {dataOverallStat} from '../data/index.js';

const tableObj  = {
        totalCustomers: Number, 
        yearlySalesTotal: Number, 
        yearlyTotalSoldUnits: Number,
        year: Number,
        monthlyData: [
                        {
                        month: String,
                        totalSales: Number,
                        totalUnits: Number,
                        },
        ],
     
        dailyData: [{
    
        date: String,
        totalSales: Number,
        totalUnits: Number,
        }],
        salesByCategory: [{
        type: Map,
        of: Number,
        }]
}

const AllStatSchema = new mongoose.Schema(
tableObj,
{ timestamps: true }
);
const AllStat = mongoose.model("AllStat", AllStatSchema); 
//AllStat.insertMany(dataOverallStat)
export default AllStat;

