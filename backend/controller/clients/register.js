import { passwordFunction } from "../../lib/passwordGeneator.js"
import { Student } from "../../model/Student.js"

export const userRegister  =async (req,res,img) =>{
// console.log(req.body)
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
                     age: Math.round( ((new Date().getTime()) - ((new Date(req.body.db)).getTime())  )/(60*60*24*360*1000))
                  }

let doc = new Student(data)
let done  = await doc.save()  
return done
}

