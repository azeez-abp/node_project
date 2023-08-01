import Users from "../../model/Users.js"

import getCountryISO3 from 'country-iso-2-to-3'

export const geographics  = async(req,res)=>{
 
        const user  = await Users.find()

        const mapLocation   = user.reduce((acc,cur)=>{
                const {country}    = cur;
                acc  = acc || {} 
                const countryIso2To3  = getCountryISO3(country)
                if( ! acc.hasOwnProperty(countryIso2To3)   ){
                        acc[countryIso2To3] = 0;
                }else{
                        acc[countryIso2To3]++
                }
                 return acc;
        },{})
      
       const format   = Object.entries(mapLocation).map(([key,value])=>{
        
            return {id:key, value:value}
       })
   
     res.json({data: format})

}

