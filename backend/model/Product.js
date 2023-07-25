import mongoose from "mongoose";
import { dataProduct } from "../data/index.js";
const ProductSchema= new mongoose.Schema (

        {
        
        name: String,
        
        price: Number,
        
        
        description: String,
        
        category: String,
        
        rating: Number,
        
        supply: Number,
        
        },
        
        { timestamps: true }
)
        const Product = mongoose. model("Product", ProductSchema);
        //Product.insertMany(dataProduct);
        export default Product;


     