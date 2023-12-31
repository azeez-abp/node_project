//var bcrypt = require('bcryptjs');
import * as bcrypt from 'bcryptjs'
import * as crypto from 'crypto'


function genPasswordCryptoBase(password){
     let salt  = crypto.randomBytes(64).toString('hex')
     let hashPass  = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')
   let res ={
             salt:salt,
             hashPass:hashPass
     }
     return res
}

function checkCryptoPassword(password,hashedPaswordFromDb,saltFromDb){
   
    let verify  = crypto.pbkdf2Sync(password,saltFromDb,10000,64,'sha512').toString('hex');

      if( verify === hashedPaswordFromDb){
        return  true 
      }else{
        return false
      }
}

async function generateHashPassword(password, saltLen=13){
   let salt  =  await bcrypt.genSalt(saltLen)
   let encodePass  = await  bcrypt.hash(password, salt)
   if(!encodePass){
    return false
   } 
   return encodePass;
//     let pa  = [];
   
//  bcrypt.genSalt(saltLen, function(err:any, salt:string):any {
//     bcrypt.hash(password, salt, function(err:any, hash:string) {
     
//         if(err){
//             return  cb(err,null); 
//         }else{
//             pa[0]=hash
//           return   cb(null,hash);  
//               //
//         }
//     });
// });   //
//return cb
}


async  function checkPassword(password,hash){
return await bcrypt.compare(password, hash)
}


export const passwordFunction =  {
   genPass :generateHashPassword,
   checkPass :checkPassword,
   genPasswordCryptoBase:genPasswordCryptoBase,
   checkCryptoPassword:checkCryptoPassword
}