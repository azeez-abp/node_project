import jwt from 'jsonwebtoken';
import { resign } from './authSign.js';
import {checkCookieHasExpred} from '../cookie/checkCookieHasExpired.js'




  
// Assuming you have the JWT token stored in a variable called 'token'
export const regenerate = (req,res,next)=>{

let authValue   = req.headers.authorization  || req.headers.Authorization
   console.log(authValue,"tken") 
if(!authValue) return res.sendStatus(401)
let token = authValue.split(" ")[1];

const decodedToken = jwt.decode(token);


if (decodedToken) {
  const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds

  // Check if the token has an expiration time (exp claim)
  if (decodedToken.exp) {

    const expirationTime = decodedToken.exp;
    // Calculate the remaining time in seconds
    const remainingTime = expirationTime - currentTime;
   // 
    if(remainingTime > 1 ) {
       return next();
      
    }
    const cookie  = req.signedCookies || req.cookie
   
    if(cookie) {
       if(remainingTime < 1 && checkCookieHasExpred(req,res,jwt)) return res.json({err:"Session has expired"})
    if(remainingTime < 1 && !checkCookieHasExpred(req,res,jwt)) {
        ///regenerare token
       // 
        resign(req,res,{id:decodedToken.id})
    }
    }
   
     


    //
  } else {
    //
  }
} else {
  //
}
next()
}