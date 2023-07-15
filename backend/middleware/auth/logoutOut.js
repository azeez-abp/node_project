import { destroyCookie } from "../cookie/destroyCookie.js";

 export const logout  = (req, res) => {
    req.logout(function(err) {
       
        if (err) { return res.status(402).json({err:"Prolblem in logout"})}
       // console.log(process.env.COOKIE_NAME)
       // res.clearCookie(process.env.COOKIE_NAME); // Clear the JWT token cookie
        destroyCookie(res,process.env.COOKIE_NAME )
        
       // delete req.headers.Authorization;
        if(req.headers.Authorization) {
         delete req.headers.Authorization;
        }
        if(req.headers.authorization) {
         delete req.headers.authorization;
        }

        if( req.session){
           req.session.user  = null
        }
   
        res.status(200).json({suc:true})
        
      });
   
  };
  