
export const checkCookieHasExpred  =  (req, res,jwt) => {
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

//   app.get('/set-cookie', (req, res) => {
//     res.setHeader('Set-Cookie', 'cookieName=cookieValue; Path=/; Max-Age=3600');
//     res.send('Cookie set successfully');
//   });
  