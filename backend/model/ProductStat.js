import mongoose from "mongoose";
import {dataProductStat} from '../data/index.js';
const ProductStatSchema = new mongoose.Schema(
{
productId: String,
yearlySalesTotal: Number,
yearlyTotalSoldUnits: Number,
year: Number,
monthlyData: [{
        month:String,
        totalSales:Number,
        totalUnit:Number
}]
,
dailyData: [{
        month:String,
        totalSales:Number,
        totalUnit:Number
}]

},
{ timestamps: true }
);
const ProductStat = mongoose.model("ProductStat", ProductStatSchema); 
//ProductStat.insertMany(dataProductStat)
export default ProductStat;

