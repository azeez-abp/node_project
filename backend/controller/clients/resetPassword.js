import PasswordReset from "../../model/PasswordResetRequests.js"
import { Student } from "../../model/Student.js"
import { passwordFunction } from "../../lib/passwordGeneator.js"

export const resetPasword  =async (req,res)=>{
        const {email, token,password}  = req.body
        if(!token || token === '') return res.json({err:"Token is requuired"})
        if(!email || email === '') return res.json({err:"Email is requuired"})
         
         try {
           const user   = await  PasswordReset.findOne({email:email,token:token})   

           let now   = (((new Date()).getTime() )  - (new Date(user.createdAt).getTime()))/(1000*60*60)
           if(now > 24){
                return res.json({err:"Invalid token"}) 
           }
           let {salt,hashPass} = passwordFunction.genPasswordCryptoBase(password)
          let update    =  await  Student.findOneAndUpdate({email:email},{password:hashPass,salt:salt})

         // console.log(update)
          if(update){
               PasswordReset.findByIdAndDelete({email:email,token:token})
              return res.json({suc:"Password reset done"})  
          } else{
               return res.json({err:"setting pasword failed"})    
          } 

         } catch (error) {
                console.log(error)
                return res.json({err:"Network error, user not found"})
         }
         






}