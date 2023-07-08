export const getUserProfile  = (req,res)=>{
   res.json({data:req.user})
}