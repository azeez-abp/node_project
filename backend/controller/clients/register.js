import { passwordFunction } from "../../lib/passwordGeneator.js"
import { Student } from "../../model/Student.js"

export const userRegister  =async (req,res,img) =>{
 
   const {fn,mn,ln,em,pa,pn,ge} = req.body
   let {salt,hashPass} = passwordFunction.genPasswordCryptoBase(pa)
   const data  = {
    first_name:fn,
    middle_name:mn,
     last_name:ln,
      email:em,
      password:hashPass,
      salt:salt,
      phone:pn,
      address:"Address",
      city:"City",
      state:"state",
      gender:ge,
      profile_img:img,
      role:'student',


}

let doc = new Student(data)
 let done  = await doc.save() 
    return done
}

