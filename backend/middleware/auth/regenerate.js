import jwt from 'jsonwebtoken';














const checkCookieHasExpred  =  (req, res) => {
    // Retrieve the value of the "cookieName" cookie from the request
    const cookieValue = req.cookies.cookieName;
  
    // Check if the cookie exists and has not expired
    if (cookieValue) {
      // Retrieve the expiration time of the cookie
      const cookieExpiration = new Date(req.cookies.cookieName.expires);
  
      // Get the current time
      const currentTime = new Date();
  
      // Compare the expiration time with the current time
      if (cookieExpiration > currentTime) {
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
      res.send('Cookie does not exist');
      return true
    }
  }
  
// Assuming you have the JWT token stored in a variable called 'token'
export const regenerate = (req,res,next)=>{

let authValue   = req.headers.authorization  || req.headers.Authorization
    
if(!authValue) return res.sendStatus(401)
let token = authValue.split(" ")[1];

const decodedToken = jwt.decode(token);
const authTokenCookie = req.cookies.authToken;

if (decodedToken) {
  const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds

  // Check if the token has an expiration time (exp claim)
  if (decodedToken.exp) {

    const expirationTime = decodedToken.exp;
    // Calculate the remaining time in seconds
    const remainingTime = expirationTime - currentTime;
    if(remainingTime < 1 && checkCookieHasExpred(req,res)) return res.json({err:"Session has expired"})
    if(remainingTime < 1 && !checkCookieHasExpred(req,res)) {
        ///regenerare token
    }
     


    console.log('Time remaining (in seconds):', remainingTime);
  } else {
    console.log('Token does not have an expiration time');
  }
} else {
  console.log('Invalid token');
}

}