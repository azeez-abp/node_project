import jwt from 'jsonwebtoken';
export const loginAuth   = (req,res,payload,secrete=null)=>{
//const decodedToken = jwt.decode(token);
//accessToken into header
//refreshToen in in the cookie
// if jsonwebtoken.sign conatains an error, PassportStrategy callback will not be called
let option  = { 
    expiresIn: '10m',
    algorithm:'HS256' 
  }
 // console.log(process.env.ACCESS_TOKEN, process.env.REFRESH_TOKEN)
const accessToken  = jwt.sign(payload, secrete?secrete:process.env.ACCESS_TOKEN, option)

  // refreshToken  into cookie
  let optio2  = { 
    expiresIn: req.body.remember? '7d':'1d',
    algorithm:'HS256' 
  }
  const refreshToken  = jwt.sign(payload,secrete?secrete:process.env.REFRESH_TOKEN,optio2)

  let max_age  = 24*60*60*1000*15
  res.cookie(process.env.COOKIE_NAME, refreshToken, { maxAge: max_age, httpOnly: true });
  req.session.user  = payload   ///if you want the user to be in session

  return {accessToken,refreshToken}
  
}

export const resign  = (req,res,payload,secrete=null)=>{
  let option  = { 
    expiresIn: '10m',
    algorithm:'HS256' 
  }
const accessToken  = jwt.sign(payload, secrete?secrete:process.env.ACCESS_TOKEN, option)
req.headers.authorization  = `Bearer ${accessToken}`
req.headers.Authorization = `Bearer ${accessToken}`


}  

/*
In a React application, the best method to manage JSON Web Tokens (JWTs) is to store them securely in the client-side application and send them with each request to the server for authentication and authorization. Here are some recommended approaches to manage JWTs in React:

Local Storage or Session Storage: You can store the JWT in the browser's local storage or session storage. When the user logs in, you can save the JWT to the storage, and for subsequent requests, you can retrieve it from storage and include it in the request headers. However, keep in mind that local storage and session storage are susceptible to cross-site scripting (XSS) attacks, so make sure to sanitize and validate the JWT before using it.

HTTP-only Cookies: Another approach is to store the JWT in an HTTP-only cookie. This ensures that the cookie is only accessible by the server and not by JavaScript code running in the browser. The server can then validate the JWT sent with each request by checking the cookie. This approach provides better security compared to local storage or session storage.

Redux or Context API: You can use state management libraries like Redux or the Context API to store and manage the JWT in the application's global state. This allows you to access the JWT from any component in your React application. When the user logs in, you can store the JWT in the state, and for subsequent requests, you can retrieve it from the state and include it in the request headers.

Axios Interceptors: If you are using the Axios library for making HTTP requests, you can use interceptors to automatically attach the JWT to every outgoing request. You can intercept the request before it is sent and append the JWT to the request headers. This approach centralizes the logic for attaching the JWT and avoids repetitive code in each request.

Choose the approach that best suits your application's requirements and security considerations. Remember to handle token expiration, refresh tokens (if applicable), and secure storage of the JWT to ensure the integrity and security of your authentication mechanism.*/