 import pkg from 'passport-jwt';
 import passport from 'passport';
const { ExtractJwt, Strategy: JwtStrategy, VerifiedCallback } = pkg;  
import dotenv from 'dotenv'
dotenv.config()
var opts2= {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}  
  //opts.secretOrKey = rsaPublick  
  console.log(process.env.ACCESS_TOKEN,"ACEES")
  opts2.secretOrKey = process.env.ACCESS_TOKEN
  opts2.ignoreExpiration  = false
  opts2.passReqToCallback =false      
  opts2.algorithms =['HS256'] 


export const jwtPassportAuthMongoCheker   =()=>{
  return (table,key='_id', value='id' )=>{
  const useMysqlToLoginJwT2  =  async (jwt_payload,done)=>{
       console.log(jwt_payload)
       let query  = {[key]:jwt_payload[value]}
       const user  = await table.findOne(query) 
       console.log(user ,"DB",query)
        if (null !== user) {
          
            return done(null, user);
       } else {
           //
           return done(null, {err:"Unauth"});
           // or you could create a new account
       }
   

  }

  /////////////////////////////////////////////////for session
     passport.serializeUser(function(user, done) {
      console.log(user, "USER")
      done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
      done(null, user);
    });

     //////////////////////////////////////////////////
    return new JwtStrategy(opts2,useMysqlToLoginJwT2)
}

}

