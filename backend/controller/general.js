import { UserSchema } from "../model/Student.js"

export const getUser  = async(req,res)=>{
    try {
        const {id} = res.params
         const user  = await UserSchema.findById(id)
         res.status(200).json(user)
    } catch (error) {
        res.status(404).json({err:error.message})
    }
}