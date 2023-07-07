 import pkg from 'passport-jwt';
const { ExtractJwt, Strategy: PassportStrategy, VerifiedCallback } = pkg;  
var opts2= {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}  
  //opts.secretOrKey = rsaPublick  
  opts2.secretOrKey = process.env.ACCESS_TOKEN
  opts2.ignoreExpiration  = false
  opts2.passReqToCallback =false      
  opts2.algorithms =['HS256'] 
export const jswPassportAuthMongoChekcer   = ()=>{
    return (passport,table,query  = {_id: jwt_payload.id})=>{

    const useMongoAuthChecker = async(jwt_payload,done)=>{
   
          try {
          
          const user =  table.findOne(query)
         
            if(!user){
                return {"err":"User not found"}
              }
              return {"suc":"User found"}
          } catch (error) {
            return {"err":"internal error"}
          }

     

}


   return passport.use(new PassportStrategy(opts,useMongoAuthChecker))
}

}

