# Cors issue

``` cross origin resource sharing issue

backend
  cors enable request, response exchage between two domain 
  use cors import cors from 'cors' | require('cors')
    
  app.use(cors(corsOptionsDelegate));

  if app does not use cors  this error will occcre
  `Access to fetch at 'http://127.0.0.1:9292/client/profile' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.`

if corsOptionsDelegate is not properly set up 
  `Access to fetch at 'http://127.0.0.1:9292/client/profile' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.`
  this is request with include credential from frontend if you dont pass any option to the cors you will have the problem

the simplest config option is { origin: true,credentials:true }
app.use(cors({ origin: true,credentials:true })) //withCredential:true at frontend or  credentials: 'include', with rtk
the purpose of with credential at frontend, is to allow cookie to be send to backend
```

Cookie issue
   res.cookie(process.env.COOKIE_NAME,refreshToken, { 
    domain:'',
    maxAge: max_age,
    httpOnly:true ,
    signed:true ,
    sameSite:'None',// "strict",// 'lax  | None'
    secure: true
  }); 
  becareful with cookie option, if is not set well check your browse Network Response Header Set-Cookie and mouseover warning icon

    throw new Error('cookieParser("secret") required for signed cookies'); if  signed:true ,