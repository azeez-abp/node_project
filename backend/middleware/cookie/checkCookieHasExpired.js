  //  res.cookie('user', user.id, { maxAge: 3600000, httpOnly: true });
 export const checkCookie  =   (req, res) => {
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
      //  res.send('Cookie is valid');
        return true
      } else {
        // Cookie has expired
     //   res.send('Cookie has expired');
        return false
      }
    } else {
      // Cookie does not exist
      return false
      //res.send('Cookie does not exist');
    }
  };
  

//   app.get('/set-cookie', (req, res) => {
//     res.setHeader('Set-Cookie', 'cookieName=cookieValue; Path=/; Max-Age=3600');
//     res.send('Cookie set successfully');
//   });
  