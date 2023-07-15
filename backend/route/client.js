import express from 'express'
import { userRegister } from '../controller/clients/register.js'
import { FileUploader } from '../uploader/FileUploder.js'
import { login } from '../controller/clients/login.js'
import { jwtPassportAuthMongoCheker } from '../middleware/auth/authChecker.js'
import passport from 'passport'
import { Student } from '../model/Student.js'
import { getUserProfile } from '../controller/clients/profile.js'
import { regenerate } from '../middleware/auth/regenerate.js'
import { logout } from '../middleware/auth/logoutOut.js'
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




passport.use(jwtPassportAuthMongoCheker()(Student))

clientRoute.get('/profile',regenerate, passport.authenticate('jwt',{session:true}) ,getUserProfile)

clientRoute.get('/logout',logout)

/////////////////////////////Path to auth below the passport auth

//clientRoute.post('/profile',   (req,res)=>  jswPassportAuthMongoChekcer()(passport,Student)  )
export default clientRoute