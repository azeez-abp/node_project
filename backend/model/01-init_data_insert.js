import mongoose from "mongoose";
import dotenv from 'dotenv'
import AllStat from './AllStat.js'
import Product from './Product.js'
import ProductStat from './ProductStat.js'
import Transaction from './Transaction.js'
import {dataOverallStat,dataProduct,dataProductStat,dataTransaction} from '../data/index.js';

dotenv.config()
const mongo_url  = (process.env.MONGO_URL).length > 4 
   ?process.env.MONGO_URL 
   : process.env.MONGO_LOCAL
console.log("url",
 typeof process.env.MONGO_URL === 'undefined',
 process.env.MONGO_LOCAL,
 mongo_url )

try {
  mongoose.connect(mongo_url);
    const db = mongoose.connection;

    db.on('error', (error) => {
      console.log("error connecting to db")
    });

    db.once('open', () => {
    console.log("Connection to db established")
    AllStat.insertMany(dataOverallStat)
	Product.insertMany(dataProduct);  
	ProductStat.insertMany(dataProductStat)
	Transaction.insertMany(dataTransaction)
	console.log("Data insertMany finished")
	//process.exit(0)
    });


}catch(e){
	console.log("ERR:", e.message)
	process.exit(1)
}
