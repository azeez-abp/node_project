import { mailer } from "../../lib/mailer.js";
import { Student } from "../../model/Student.js";
import { randomStr } from "../../lib/randomString.js";
import PasswordReset from "../../model/PasswordResetRequests.js";




export const resquestPassword  = async(req,res) =>{
   
        if(!req.body.email || req.body.email==='') return res.json({err:"Email is required"})
   
        let user  = await Student.findOne({email:req.body.email});
        if(!user) return res.json({err:"Unknown user"})
   
        const token  = randomStr(64,false,false,false)
         
        mailer('Web service provider',[req.body.email], 'Request for password rest', `
        <p>
        Dear ${user.first_name} ${user.last_name},

        We have received a request to reset your account password. If you did not make this request, you can ignore this email and your password will remain unchanged.

        If you did initiate the password reset, please click on the link below to reset your password:

         <h2>http://127.0.0.1:3000/reset-password/${req.body.email}/${token} </h2>

        This link is valid for the next 24 hours. After that, you will need to request a new password reset.

        If you encounter any issues or need further assistance, please don't hesitate to contact our support team at [Support Email/Phone Number].

        Thank you,
        WebApp Support Team
        </p>`,async(err,suc)=>{

                if(err) return res.json({err:"Error sending message "})
              try {
                let  newInsert  = new PasswordReset({
                        email:req.body.email,
                        token:token,
                })
              
                newInsert  = await  newInsert.save()
                if(newInsert){
                        return res.json({suc:"Password reset done"})  
                }else{
                        return res.json({err:"Error reseting pasword"})
                }
              } catch (error) {
                console.log(error.message)
                return res.json({err:error.message})
              }  
              

        })  

}