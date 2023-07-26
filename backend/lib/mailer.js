//const nodemailer = require('nodemailer');
//const fs = require("fs")
import * as nodemailer  from 'nodemailer'
import fs from 'fs'
import path, { dirname } from "path";
//import { configVar } from "../Config/keys/Key";
//import DKIM from "nodemailer/lib/dkim";
//let keys:any  = configVar().MAIL_URL


const htmlTemplate  =(message,subject,from)=>`
<body style=" font-family: Arial, sans-serif;
background-color: #f9f9f9;
color: #333;
width: 100%;">
  <div class="container" style="
 margin:'0px auto';
  width: 100%;
  height: 100vh;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;">
    <div class="header" style=" width: 100%;
    height: 30px;
    padding: 6px;
    background-color: #000;
    color: white;
    text-align: center;
    line-height: 2;
    "> Email
      from ${from} 
    </div>
        <h1>${subject}</h1>
        <p>${message}</p>
      <div class="footer" style=" width: 100%;
      height: 30px;
      padding: 6px;
      background-color: #000;
      color: white;
      text-align: center;
      line-height: 2;
      ">
        Copy right © ${new Date().getFullYear()}
      </div>
  </div>
</body>

`

export const mailer  = (from_,to=[],subject,messge_content,cb)=>{

  

    //   let transporter = nodemailer.createTransport({
    //          host: keys.h,
    //          port: 465,
    //        //  port: 587,
    //          auth: {
    //              user:keys.u,
    //              pass: keys.p
    //          }

    //  })

// //console.log(fs.readFileSync(path.join(__dirname,'dkim.pem'),'utf-8'))
//      transporter.use('stream', require('nodemailer-dkim').signer({
//       domainName: 'abp.com.ng',
//       keySelector: '2017',
//       privateKey: fs.readFileSync(path.join(__dirname,'dkim.pem'),'utf-8')
//     //  privateKey: fs.readFileSync(path.join(__dirname,'dkim.pem'))
//   }));

  let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
    auth: {
            user:process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
    },

    // dkim: {
    //     keys: [
    //         {
    //             domainName: 'abp.com.ng',
    //             keySelector: '2017',
    //             privateKey: fs.readFileSync(path.join(__dirname,'dkim.pem'),'utf-8') 
            
    //         },
    //         // {
    //         //     domainName: 'example.com',
    //         //     keySelector: '2016',
    //         //     privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBg...'
    //         // }
    //     ],
    //     cacheDir: false
    // }
});
    
let message = {
        from: from_,
        to: to,
        subject: subject,
        html: htmlTemplate( messge_content,subject,from_)
    }

     transporter.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
          cb(err,null)
          return 
        } else {
          cb(null,{suc:info})
         // console.log(info,'done');
        }
    } 
     )

}  