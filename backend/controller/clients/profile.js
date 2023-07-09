export const getUserProfile  = (req,res)=>{
   //console.log(req.user, "USER")
  return  res.json({data:req.user})
}