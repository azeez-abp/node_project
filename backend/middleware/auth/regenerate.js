import jwt from 'jsonwebtoken';
import { resign } from './authSign.js';



const checkCookieHasExpred  =  (req, res) => {
    // Retrieve the value of the "cookieName" cookie from the request
    const cookieValue = req.cookies[process.env.COOKIE_NAME];
    console.log(cookieValue , "COOKIE")
    // Check if the cookie exists and has not expired
    if (cookieValue) {
      // Retrieve the expiration time of the cookie
      const decodedToken = jwt.decode(cookieValue);
     // console.log(cookieValue , "COOKIE",process.env.COOKIE_NAME,cookieValue,decodedToken)
      const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds
      const cookieExpireTime   = decodedToken.exp
      const remainingTime = cookieExpireTime - currentTime;
  
       
      console.log(currentTime , "COOKIE",remainingTime,decodedToken.exp)
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
   // console.log(remainingTime, "REMAIN TIME")
    if(remainingTime >1 ) {
      return next()
    }
    if(remainingTime < 1 && checkCookieHasExpred(req,res)) return res.json({err:"Session has expired"})
    if(remainingTime < 1 && !checkCookieHasExpred(req,res)) {
        ///regenerare token
        resign(req,res,{id:req.user._id.valueOf()})
    }
     


    //console.log('Time remaining (in seconds):', remainingTime);
  } else {
    //console.log('Token does not have an expiration time');
  }
} else {
  //console.log('Invalid token');
}
next()
}