import { Student } from "../../model/Student.js";
import { passwordFunction } from "../../lib/passwordGeneator.js";
import { loginAuth } from "../../middleware/auth/authSign.js";
import { crypto as coder } from "../../lib/crypto.js";
import pkg from 'base-64';
const { decode: atob, encode: btoa } = pkg;

export const login = async (req, res) => {
  try {
    const { email, password, remember } = req.body;
    let err = "";

    if (!email) err += "Email is required \n";
    if (!password) err += "Password is required \n";

    if (err) {
      return res.status(400).json({ err });
    }

    const user = await Student.findOne({ email: email }).select('password salt');

    if (!user) {
      return res.status(400).json({ err: "Unknown user" });
    }

    if (!passwordFunction.checkCryptoPassword(password, user.password, user.salt)) {
      return res.status(404).json({ err: "Invalid login details" });
    }

    const { accessToken } = loginAuth(req, res, { id: user._id.valueOf() });
    
    return res.status(200).json({
      suc: true,
      user:{_id:user._id},
      accessToken: coder.encode(
        [accessToken],
        process.env.ACCESS_TOKEN,
        JSON.parse(atob(process.env.ACCESS_TOKEN_KEY))
      ),
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ err: "Internal Server Error" });
  }
};


// import { Student } from "../../model/Student.js"
// import { passwordFunction } from "../../lib/passwordGeneator.js"
// import { loginAuth } from "../../middleware/auth/authSign.js"
// import { crypto as coder } from "../../lib/crypto.js"
// import pkg from 'base-64';
// const {decode: atob, encode: btoa} = pkg;

// export const login   = async(req,res)=>{
//     const {email, password, remember}   = req.body
//     let err  = ""
//     if(!email) err += "Email is required \n"
//     if(!password) err += "Password is required \n"
//     console.log(email, "email")
//     const login   =  await Student.findOne({email:email}).select('password salt')
//     if(err){
//         return res.status(400).json({err})
//     }
//     if(!login){
//        return res.status(404).json({err:"Unknown user"})
//     }
//     if(! passwordFunction.checkCryptoPassword(password,login.password,login.salt)){
//         return res.status(404).json({err:"Invalid login details"}) //the sgin aut
//     }
//     ///set authorize or session and coookie
//    // coder.en( accessToken ,'webapp' ,[3,2,1,0,4]) '
 
//       const {accessToken} = loginAuth(req, res, {id:login._id.valueOf()} ) 
//       const user  =  await Student.findOne({email:email})
    
//       ////use auth middlwware
//    return res.status(200).json({ suc:true,user, accessToken:coder.encode( [accessToken] ,process.env.ACCESS_TOKEN , JSON.parse(atob(process.env.ACCESS_TOKEN_KEY))    )  })
//  }//3,4,2,0,1