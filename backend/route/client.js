import express from 'express'
import { userRegister } from '../controller/clients/register.js'
import { FileUploader } from '../uploader/FileUploder.js'
import { login } from '../controller/clients/login.js'
import { jswPassportAuthMongoChekcer } from '../middleware/auth/authChecker.js'
import passport from 'passport'
import { Student } from '../model/Student.js'
const clientRoute = express.Router()


//clientRoute.post('/',userRegister)

const upl  =  new FileUploader(clientRoute,'./public/images',1200000,500000,500000,['png','jpg','gif','webp'])
 upl.getFileAndUpload('/register','img',true,[200,400], (req,res,images)=>{
  let img  = images[0].path
  userRegister(req,res,img).then((data)=>{
     res.status(200).json({suc:true,message:img})
  }).catch((error)=>{
   res.status(200).json({err:error.message})
  })



 })

clientRoute.get('/user',(req,res)=>{
    res.status(200).json({"data":"WORKING USER"})
})

clientRoute.post('/login',login)

/////////////////////////////Path to auth below the passport auth

//clientRoute.post('/profile',   (req,res)=>  jswPassportAuthMongoChekcer()(passport,Student)  )
export default clientRoute