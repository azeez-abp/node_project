import mongoose from "mongoose";
/*{
    first_name,
    middle_name,
     last_name,
      email,
      password,
      salt
      phone,
      address,
      city,
      state,
      gender,
      profile_img,
      role:'student,


}*/
export const UserSchema  = mongoose.Schema({
    first_name :{
        type:String,
        require:true,
        min:2,
        max:60
    },
    middle_name :{
        type:String,
        require:true,
        min:2,
        max:60
    },
    last_name :{
        type:String,
        require:true,
        min:2,
        max:120
    },
    email :{
        type:String,
        require:true,
        unique:true,
        min:2,
        max:60
    },
    password :{
        type:String,
        require:true,
        min:20,
        max:120,
        select: false
    },
    salt :{
        type:String,
        require:true,
        min:20,
        max:120,
        select: false
    },
    phone: {
        'type': String,
      //  'unique': true,
        'required': true,
    },
    address: {
        'type': String,
        'required': true,
       
    },
    city: {
        'type': String,
        'required': true,
      
    },
    state: {
        'type': String,
        'required': true,
     
    },
    
    gender: {
        'type': String,
        'enum': ['male', 'female'],
        'required' :true
    },
   
    profile_img:{
        'type':String,
         //require:true,
       // 'default':"/public/images/avater/ava.png"
    },
    role :{
        type :String,
        enum:["student","parent","partner","teacher","admin"],
        default:"admin"

    }
    
}, 
 {timestamp :true}
)


export const Student  =  mongoose.model('User',UserSchema)