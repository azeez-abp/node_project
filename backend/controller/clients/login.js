import { Student } from "../../model/Student.js"
import { passwordFunction } from "../../lib/passwordGeneator.js"
import { loginAuth } from "../../middleware/auth/authSign.js"
import { crypto as coder } from "../../lib/crypto.js"
import pkg from 'base-64';
const {decode: atob, encode: btoa} = pkg;

export const login   = async(req,res)=>{

    const {email, password, remember}   = req.body
   
    let err  = ""
    if(!email) err += "Email is required \n"
    if(!password) err += "Password is required \n"
    const login   =  await Student.findOne({email:email}).select('password salt')
    if(err){
        return res.status(400).json({err})
    }
    if(!login){
       return res.status(404).json({err:"Unknown user"})
    }
    
    if(! passwordFunction.checkCryptoPassword(password,login.password,login.salt)){
        return res.status(404).json({err:"Invalid login details"}) //the sgin aut
    }
    ///set authorize or session and coookie
   // coder.en( accessToken ,'webapp' ,[3,2,1,0,4]) 
      const {accessToken} = loginAuth(req, res, {id:login._id.valueOf()} ) 
      console.log(coder)
      ////use auth middlwware
    res.status(200).json({ suc:true, accessToken:coder.encode( [accessToken] ,process.env.ACCESS_TOKEN , JSON.parse(atob(process.env.ACCESS_TOKEN_KEY))    )  })
 }//3,4,2,0,1