import mongoose from "mongoose";
import { dataTransaction } from "../data/index.js";
const TransactionShema= new mongoose.Schema (

        {
        
        userId: String,
      
       cost: String,
        
       products :{
        type :[mongoose.Types.ObjectId],
        of:Number
       }

        
        },
        
        { timestamps: true }
)
        const Transaction = mongoose. model("Transaction", TransactionShema);
        //Transaction.insertMany(dataTransaction);
        export default Transaction;


     