import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import helmet from 'helmet'
import morgan from 'morgan'

import clientRoute from './route/client.js'
import generalRoute from './route/general.js'
import managementRoute from './route/management.js'
import saleRoute from './route/sales.js'
/*CONFIGURSTION*/
dotenv.config()
const app  = express()
app.use(express.json())
/*express.json() middleware to parse incoming requests with a JSON payload.
 This middleware automatically parses the request body if the Content-Type 
header is set to "application/json", and exposes the parsed JSON data on the request.body property.*/
app.use(helmet())
/*Helmet is a collection of middleware functions that help secure Express applications by setting various HTTP headers related to security.
This enables Helmet's default security enhancements, such as setting appropriate
 HTTP headers like X-Content-Type-Options, Strict-Transport-Security, X-XSS-Protection, and more
*/
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}))
/*The Cross-Origin Resource Policy is a security feature that allows you to control how your web 
application's resources are shared with other origins. It helps prevent 
unauthorized access to sensitive resources by enforcing restrictions on cross-origin requests.
"cross-origin", indicating that your application is willing to share its resources with other origins.
*/
app.use(morgan("common"))//Morgan is a popular logging middleware for Node.js applications

app.use(cors())
/* This middleware automatically handles the CORS-related HTTP headers and allows cross-origin requests to your application's routes.*/
app.use(bodyParser.urlencoded({extended:false}))
/*sets up the body parser middleware to parse incoming requests with 
URL-encoded form data. The {extended:false} option specifies that the query 
string parser should use the classic query string library instead of the modern 
query string parser. This means that the parsed URL-encoded data will be represented as a
 plain JavaScript object, where the values are either strings or arrays.*/

 /*ROUTE*/
 app.use('/client',clientRoute)  ////client
 app.use('/general', generalRoute)
 app.use('/management',managementRoute)
 app.use('/sales',saleRoute)

/*SET MONGOOSE*/
const PORT  = process.env.PORT || 9292
console.log(process.env.MONGO_URL, "is")
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT,()=>console.log(`http://127.0.0.1:${PORT} started`))
}).catch((error)=>console.log(`${error} not connect`))
  