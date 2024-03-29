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
import { getProduct } from '../controller/clients/product.js'
import { resquestPassword } from '../controller/clients/requetPassword.js'
import { resetPasword } from '../controller/clients/resetPassword.js'
import { getTransaction } from '../controller/clients/getTransaction.js'
import { geographics } from '../controller/clients/geographics.js'
import { salesStatistics } from '../controller/clients/salesStat.js'
const clientRoute = express.Router()


//clientRoute.post('/',userRegister)

const upl  =  new FileUploader(clientRoute,'./public/images',1200000,500000,500000,['png','jpg','gif','webp'])
 
upl.getFileAndUpload('/register','img',true,[200,400], (req,res,images)=>{
 
  userRegister(req,res,images[0].path).then((data)=>{
 
     res.status(200).json({suc:true,message:images[0].path})
  }).catch((error)=>{
   res.status(400).json({err:error.message})
  })

 })


clientRoute.get('/user',(req,res)=>{
    res.status(200).json({"data":"WORKING USER"})
})

clientRoute.post('/login',login)

clientRoute.post('/request-password',resquestPassword)
clientRoute.put('/reset-password',resetPasword)

passport.use(jwtPassportAuthMongoCheker()(Student))

clientRoute.get('/profile',regenerate, passport.authenticate('jwt',{session:true}) ,getUserProfile)

clientRoute.get('/logout',logout)

clientRoute.get('/product',regenerate, passport.authenticate('jwt',{session:true}), getProduct);
clientRoute.get('/transactions',regenerate,passport.authenticate('jwt',{session:true}), getTransaction)
clientRoute.get('/geography',regenerate,passport.authenticate('jwt',{session:true}),geographics)
clientRoute.get('/stat',regenerate,passport.authenticate('jwt',{session:true}),salesStatistics)
/////////////////////////////Path to auth below the passport auth

//clientRoute.post('/profile',   (req,res)=>  jswPassportAuthMongoChekcer()(passport,Student)  )
export default clientRoute