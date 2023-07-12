import jwt from 'jsonwebtoken';
import { resign } from './authSign.js';



const checkCookieHasExpred  =  (req, res) => {
    // Retrieve the value of the "cookieName" cookie from the request
    
    const  cookie  = req.signedCookies || req.cookie
    const cookieValue = cookie[process.env.COOKIE_NAME];
    
    // Check if the cookie exists and has not expired
    if (cookieValue) {
      // Retrieve the expiration time of the cookie
      const decodedToken = jwt.decode(cookieValue);
     // 
      const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds
      const cookieExpireTime   = decodedToken.exp
      const remainingTime = cookieExpireTime - currentTime;
  
       
      
      // Compare the expiration time with the current time
      if (remainingTime > 0 ) {
        // Cookie has not expired
        //res.send('Cookie is valid');
       
        return false
      } else { 
       
        // Cookie has expired
        return true
       // res.send('Cookie has expired');
      }
    } else {
      // Cookie does not exist
    //  res.send('Cookie does not exist');
      return true
    }
  }
  
// Assuming you have the JWT token stored in a variable called 'token'
export const regenerate = (req,res,next)=>{

let authValue   = req.headers.authorization  || req.headers.Authorization
    
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
    if(remainingTime >1 ) {
      return next()
    }
    const cookie  = req.signedCookies || req.cookie
    if(cookie) {
       if(remainingTime < 1 && checkCookieHasExpred(req,res)) return res.json({err:"Session has expired"})
    if(remainingTime < 1 && !checkCookieHasExpred(req,res)) {
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