import * as fs from 'fs'
import { randomStr } from '../lib/randomString.js';
import { MulterSetting } from './MulterSetting.js' 
import  sharp  from 'sharp'
import { default as image_size } from 'image-size';


//const image_size  = require('image-size')

export class FileUploader {
 
  #multerSetting = new MulterSetting()
 
  constructor(router,image_store_path, size,width, heigth, validExts=[]){
    
    this.router = router;
    this.size  = size;
    this.width  =width
    this.heigth = heigth
    this.validExts  = validExts
    this.image_store_path  = image_store_path
}

imageValidator(image_){
  /* Return two dimensional array string[][]*/
    const size  = this.size
    const width = this.width
    const height  = this.heigth
    const imgErr  = [];
    const imgUrl = []
    const valid_image_extension  = this.validExts


     try {
      
   
      image_.forEach((img) =>{
        
          const dimensions = image_size(img.path)///  //out put{ height: 225, width: 225, type: 'jpg' }
         // console.log(dimensions,img.size,(img.size/(1024*1024)))
          if( (img.size/(1024*1024)) > size){
              imgErr.push(img.originalname +"  size "+img.size+" is more that "+ size +" px")
              if(imgUrl.indexOf(img.path) === -1){
                  imgUrl.push(img.path)
              }
          }
  
          if(dimensions.width >width){
              imgErr.push(img.originalname +" width "+dimensions.width+"px is more that "+ (width) +"px " )
              if(imgUrl.indexOf(img.path) === -1){
                  imgUrl.push(img.path)
              }
          }
  
          if(dimensions.height >height){
              imgErr.push(img.originalname +" heigth is more that "+ height)
              if(imgUrl.indexOf(img.path) === -1){
                  imgUrl.push(img.path)
              }
          }
  
  
       if(valid_image_extension.length >0 ){
          if(valid_image_extension.indexOf(dimensions.type) === -1){
              imgErr.push(img.originalname +" extension "+dimensions.type+" is not allow. Allow extension  are "+valid_image_extension.join(" , ")) 
          }
       }   
        
    
      })
     
      return [imgErr,imgUrl,image_]

    } catch (error) {
      return  [['err'],[error]]
    }

  }



getFileAndUpload(url, image_input_field_name,isSingle=false,resize_image_ = [], callback ){
    sharp.cache({ files : 0 });////prevent directory from lock
    try {
      
  

  let $uploader  = this.#multerSetting.getStoragePath(this.image_store_path).upload.single(image_input_field_name)  
  let $uploaders  =  this.#multerSetting.getStoragePath(this.image_store_path).upload.array(image_input_field_name,12) 
  let whichUploader  = isSingle?$uploader:$uploaders;
 
  this.router.post(url, whichUploader,(req,res,next)=>{
      let imgDir   = []; 
       let filesArr  = isSingle?[req.file]:req.files
      let img_validation_pass  =    this.imageValidator(filesArr)
       // console.log(img_validation_pass)
       
      if(img_validation_pass[0][0] === 'err'){
        return res.status(400).json( {err: `
             This error occur for the following reason 
             1. Did you have image field in your form with name attribute "${image_input_field_name}? 
             2. Did you select the image?
        
        ` })
      }
     
      if(img_validation_pass[0].length > 0){
                   /**
                    * @[imgErr].lenght >0 
                    * remove all the images
                    * send error to the user
                   */
              function removeImage(index){
                //  console.log("recurse",index,img_validation_pass[1])
                  if(index >= img_validation_pass[2].length){
                    return 0;
                  }
                  let {path} = img_validation_pass[2][index]
                      path =   path.replace(/\\/g,'/')
            
                  fs.unlink(path,(err2)=>{
                      if(err2) {   
                          //console.log(err2)
                         return res.json({err:["unlink error"]})
                         // process.exit()
                      }
              
                    })
                  removeImage(index+1)
              }  
        
         removeImage(0)
        
          res.json({err:img_validation_pass[0]})
        //  process.exit(0);
        }
        else{
      
                  /////////////////////////////////////////////////validation pass
                            
                  img_validation_pass[2].forEach((img)=>{
                    // require('../../../public')
                        let new_path = img.path.replace(/\\/g, "\/")
                        let pathObj = {};
                        pathObj['path']  = new_path;
                   function resizeImage(){
                     const dimension = fs.existsSync(img.path)?image_size(img.path):{type:img.mimetpe.split("/")[1]}///out put{ height: 225, width: 225, type: 'jpg' }
                     let new_path2 =  new_path.match(/.+(?=\.)/)
                     new_path  = new_path2[0]
                     let added_to_new_path  = randomStr(12)
                   let resize_name  = new_path+'__'+added_to_new_path+'.'+dimension.type
                  // imgDir.push({path:new_path }) 
                  pathObj['path']  = resize_name
              
                setTimeout(()=>{
                   sharp(img.path)
                   .resize(resize_image_[0],resize_image_[1],
                    {
                        kernel: sharp.kernel.nearest,
                      // fit: 'contain',
                      //  position: 'right top',
                        fit: sharp.fit.inside,
                        withoutEnlargement: true,
                        background: { r: 255, g: 255, b: 255, alpha: 0.5 }
                      })
                   .toFile(resize_name)
                   .then( (e) => {
                    // console.log(e)
                    /////////////////////////////////////////////
                      fs.existsSync(img.path)?fs.unlinkSync(img.path):null
                           /////////////////////
                       }
                   
                   ) .catch(er=>{
                     // console.log(er, "is err")
                     return res.json({err:["Server encounter error"]})
                        //   process.exit()  
                   })
             
     
                 },4000)
                     
                  }  
                  resize_image_.length > 0? resizeImage():null
               //////////////////////end of resizeImage function   
     
                   imgDir.push(pathObj)
                 })/////end of forEach
                   res.uploaded_img_ = imgDir
               return   callback(req,res,imgDir)
             //  return  res.json({suc:'image upload done',img_dir:imgDir })
    
              ///////////////////////////////////////////validation pass
        }

    
  })
 
} catch (error) {
   return {error}
  //  console.log("ERROR",error)  

}
}

  

}