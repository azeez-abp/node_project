import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { FileUploader } from './uploader/FileUploder.js'
import passport from 'passport'
import * as express_session from 'express-session'
import { sessionMiddleware } from './middleware/session/session.js'
import MongoDBStore from 'connect-mongodb-session';
import session from 'express-session'
import cookieParser from 'cookie-parser';
import clientRoute from './route/client.js'
import generalRoute from './route/general.js'
import managementRoute from './route/management.js'
import saleRoute from './route/sales.js'
const mongo_url  = process.env.MONGO_URL
const PORT  = process.env.PORT || 9292
const MongoDBStoreSession = MongoDBStore(session);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/*CONFIGURSTION*/
dotenv.config()
const app  = express()

let whitelist= [
  'http://127.0.0.1:'+PORT,
  'https://127.0.0.1:'+PORT,
  '127.0.0.1:'+PORT,///this the the one
  '127.0.0.1:3000/',///this the the one
  'localhost:'+PORT
  //undefined
  ]
var corsOptions = {
  origin: function (origin, callback) {
    //  
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS '+origin))
    }
  },
  optionSuccessStatus:200,
  credentials: true,
}


let corsOptionsDelegate  = function (req, callback) {
  var corsOptions;
 // 
 //req.hostname,127.0.0.1 
  
  if (whitelist.indexOf(req.headers.host) !== - 1 || whitelist.indexOf(req.headers.referer)) {
    
    corsOptions = { origin: true,credentials:true } // reflect (enable) the requested origin in the CORS response
  } else {
      //

    //  
    throw new Error("Rejection by cors")
    //corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options

}
//app.use(cors({ origin: true,credentials:true }));
app.use(cors(corsOptionsDelegate));
// app.use(cors({
//   credentials: true,
//   origin: 'http://localhost:3000',
// }));
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

 app.use(  session({
  secret: process.env.MONGO_SESSION,
  resave: false,
  saveUninitialized: false,
  store:  new MongoDBStoreSession({
  uri: mongo_url,
  collection: 'sessions', /// will  create collection sessions
})
})  );
 app.use(passport.session())
 app.use(passport.initialize())
 app.use(cookieParser("abpsingnature"))

//app.use(cors())
/* This middleware automatically handles the CORS-related HTTP headers and allows cross-origin requests to your application's routes.*/
//app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({ extended: true }) )  
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.text())
/*sets up the body parser middleware to parse incoming requests with 
URL-encoded form data. The {extended:false} option specifies that the query 
string parser should use the classic query string library instead of the modern 
query string parser. This means that the parsed URL-encoded data will be represented as a
 plain JavaScript object, where the values are either strings or arrays.*/



 //  res.cookie('user', user.id, { maxAge: 3600000, httpOnly: true });

app.set('trust proxy', true)// use req.ip to get ip



app.use(express.static(path.join(__dirname,'/public')))
app.use((req, res, next) => {
   
 // res.header('X-XSS-Protection', '1');
  next();
});
//  const upl  =  new FileUploader(app,'./public/images',1200000,500000,500000,['png','jpg','gif','webp'])
//  upl.getFileAndUpload('/fileloader','img',true,[200,400], (req,res,images)=>{
 
//   res.status(200).json({suc:"Image uploald done"})
//  })

 /*ROUTE*/
 app.use('/client',clientRoute)  ////client
 app.use('/general', generalRoute)
 app.use('/management',managementRoute)
 app.use('/sales',saleRoute)

/*SET MONGOOSE*/

//


  
let hasNotConnected  = true;
var conuntime  = 0

while(hasNotConnected){
   
    async function connects(){
        await   mongoose.connect(mongo_url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
    }

   try { 
     connects()
     app.listen(PORT,()=>console.log(`http://127.0.0.1:${PORT} started`))
    hasNotConnected  = false
    break
   } catch (error) {
    
    hasNotConnected++
    
    if(hasNotConnected===10){
     
     break
    }
   }


    
}

app.get('/*',(req,res)=>{
    //LogEvents.emit('error_log', `${req.path} return 404 Error`)
    res.send(`<h1>404 File not file</h1>`)
})


/*
Model
.where('age').gte(25)
.where('tags').in(['movie', 'music', 'art'])
.select('name', 'age', 'tags')
.skip(20)
.limit(10)
.asc('age')
.slaveOk()
.hint({ age: 1, name: 1 })
.exec(callback);


 where: [Function (anonymous)],
      equals: [Function: equals],
      eq: [Function: eq],
      or: [Function: or],
      nor: [Function: nor],
      and: [Function: and],
      gt: [Function (anonymous)],
      gte: [Function (anonymous)],
      lt: [Function (anonymous)],
      lte: [Function (anonymous)],
      ne: [Function (anonymous)],
      in: [Function (anonymous)],
      nin: [Function (anonymous)],
      all: [Function (anonymous)],
      regex: [Function (anonymous)],
      size: [Function (anonymous)],
      maxDistance: [Function (anonymous)],
      minDistance: [Function (anonymous)],
      mod: [Function (anonymous)],
      exists: [Function (anonymous)],
      elemMatch: [Function (anonymous)],
      within: [Function: within],
      box: [Function (anonymous)],
      polygon: [Function (anonymous)],
      circle: [Function (anonymous)],
      near: [Function: near],
      intersects: [Function: intersects],
      geometry: [Function: geometry],
      select: [Function: select],
      slice: [Function (anonymous)],
      sort: [Function (anonymous)],
      limit: [Function (anonymous)],
      skip: [Function (anonymous)],
      maxScan: [Function (anonymous)],
      batchSize: [Function (anonymous)],
      comment: [Function (anonymous)],
      maxTimeMS: [Function (anonymous)],
      maxTime: [Function (anonymous)],
      snapshot: [Function (anonymous)],
      hint: [Function (anonymous)],
 merge: [Function (anonymous)],
      find: [Function (anonymous)],
      cursor: [Function (anonymous)],
      findOne: [Function (anonymous)],
      count: [Function (anonymous)],
      distinct: [Function (anonymous)],
      update: [Function: update],
      updateMany: [Function: updateMany],
      updateOne: [Function: updateOne],
      replaceOne: [Function: replaceOne],
      remove: [Function (anonymous)],
      deleteOne: [Function (anonymous)],
      deleteMany: [Function (anonymous)],
      findOneAndUpdate: [Function (anonymous)],
      findOneAndDelete: [Function (anonymous)],
      findOneAndRemove: [Function (anonymous)],*/