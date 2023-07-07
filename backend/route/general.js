import express from 'express'
const generalRoute = express.Router()
import { getUser } from '../controller/general.js'
generalRoute.get('/user/:id',getUser)
export default generalRoute