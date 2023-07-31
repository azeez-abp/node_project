import mongoose from "mongoose";
import { dataUser } from "../data/index.js";
const UsersShema= new mongoose.Schema (
        {
   
                name: String,
                email: String,
                password: String,
                city: String,
                state:String,
                country: {
                        type :String,
                        default:null,
                
                    },
                occupation: String,
                phoneNumber: String,
                transactions: {
                        type : [mongoose.Types.ObjectId],
                        ref:'transactions'
                         
                    },
                role: {
                        type :String,
                        enum:["user","superadmin","admin"],
                        default:"user"
                
                    },
        },
        
        { timestamps: true }
)
        const Users = mongoose.model("user", UsersShema,'user');
      //  Users.insertMany(dataUser);
        export default Users;


     