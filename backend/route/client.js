import express from 'express'
const clientRoute = express.Router()

console.log("sdsds")

clientRoute.get('/',(req,res)=>{
    res.status(200).json({"data":"WORKING"})
})

clientRoute.get('/user',(req,res)=>{
    res.status(200).json({"data":"WORKING USER"})
})

export default clientRoute