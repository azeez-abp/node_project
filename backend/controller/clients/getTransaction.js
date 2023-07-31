import Transaction from "../../model/Transaction.js"

export const getTransaction  =async (req,res)=>{
     
  const {page=1,pageSize=20,sort=null,search=""}  = req.query

  let sorting = {}

  if(sort){
      let sortObj  = JSON.parse(sort)
      sorting[ sortObj['field']]  =  sortObj[sort] === 'asc' ? 1 : -1
  }
  
  try {
        
      const transactions = await Transaction.find({
            $or: [
              { cost: { $regex: new RegExp(search, "i") } },
              { userId: { $regex: new RegExp(search, "i") } }
            ]
          }).sort(sorting).skip(page * pageSize).limit(pageSize);
          
           

          console.log( transactions,search, "ertyu",sorting)

          let totalCount  = await Transaction.countDocuments({
                cost : {$regex: search, $options : "i"}
          })

      //     if(totalCount === 0){
      //       totalCount  = await Transaction.countDocuments()
      //     }
        
          res.status(200).json({
                suc:true,
                transactions,
                totalCount
          })
        
  } catch (error) {
           res.status(404).json({err:error.message})
  }
  
  
   
} 