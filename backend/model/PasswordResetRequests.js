import mongoose from "mongoose";

const PasswordResetSchema= new mongoose.Schema (

        {
        
        email: String,
        
        token: String,
 
        
        },
        
        { timestamps: true }
)
        const PasswordReset = mongoose. model("PasswordReset", PasswordResetSchema);

        export default PasswordReset;


     