import AllStat from "../../model/AllStat.js";


export const salesStatistics   = async (req,res)=>{
    
        try {
                const data  = await AllStat.find()

                res.status(200).json({data})      
        } catch (error) {
                res.status(404).json({error:error.message})    
        }

}