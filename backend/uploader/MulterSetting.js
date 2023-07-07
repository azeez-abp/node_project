
import multer from 'multer'
import path from 'path'
import sharp from 'sharp'
//import { randomStr } from '../../Functions/RandonString';
import { randomStr } from '../lib/randomString.js';
import * as fs from 'fs'


export class MulterSetting  {
 /**
  * 
  * @param {*} $path 
  * @returns {upload:multer.Multer ,resizer:typeof sharp}
  */
getStoragePath($path){
  
       try {
        let $mpath  = $path.match(/(?<=\/).+/)
 
        
       if(!fs.existsSync($path)){
        console.log($mpath[0],"PATH")
        // console.log($path, $path.substr(1,$path.length),$mpath)
         if($path){
          let mk  =  fs.mkdirSync($path,{ recursive: true })
          console.log(mk, "MK")
         }
         
      }
       } catch (error) {
        console.log(error.message)
       }

        const storage = multer.diskStorage(
            {  
        
            destination: function(req, file, cb) {
                cb(null, $path);
                return;
              
            },
        
            filename: function(req, file, cb) {
                 let fn = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
                 let fn2 = randomStr(32)+path.extname(file.originalname)
               //  console.log(fn,fn2)
                cb(null, fn2);
            },
           
         

        }
        // as multer.DiskStorageOptions
        );   
     
      var upload = multer({
         storage: storage,
   
   }
   )
        
  return {
    upload,
    resizer:sharp
}
}

}

 

  
