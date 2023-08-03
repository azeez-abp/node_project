//import { promises } from "nodemailer/lib/xoauth2/index.js"
import Product  from "../../model/Product.js"
import ProductStat from "../../model/ProductStat.js"
export const getProduct  = async (req,res)=>{

        // const products  = await Product.find({},{ _id: 1, name: 1, price: 1, description: 1,}).limit(1000).skip(0)
        // const product2  = await ProductStat.find({},{productId:1,_id:0}).limit(1000).skip(0)

        // const productWithStat2  = await Promise.all(products.map(async(product,id)=>{
        //       const dataStat  =   await  ProductStat.find({productId:product._id})
        //       return {...product.doc,dataStat}
        // } ))

        const productWithStat  = await Product.aggregate([
                {
                //  new mongoose.Types.ObjectId()
                  $addFields: {
                    _idToString: { $toString: '$_id' }, // Convert _id to string representation
                  },
                },
                {
                  $lookup: {
                    from: 'productstats',
                    localField: '_idToString', // Use the new _idToString field for matching; 
                    // localField && foreignField must be of the same type
                    foreignField: 'productId',
                    as: 'productStats',
                  },
                },
                {
                        $project:{
                                name: 1,
                                price: 1,
                                description: 1,
                                category: 1,
                                rating: 1,
                                supply: 1,
                                yearlySalesTotal: '$productStats.yearlySalesTotal',
                                yearlyTotalSoldUnits: '$productStats.yearlyTotalSoldUnits',
                                year: '$productStats.year',
                                monthlyData: { $arrayElemAt: ['$productStats.monthlyData', 0] },
                                dailyData: { $arrayElemAt: ['$productStats.dailyData', 0] },
                        }
                },
                {
                  $unwind: { path: '$productStats', preserveNullAndEmptyArrays: true },
                },

                {
                    $limit :1000    
                },
                {
                        $sort:{name:1}
                }
               
              
              ])
        
        
        //       const productWithStat  = await  Product.aggregate([
        //         {

        //           $lookup: {
        //             from: 'productstats', // The name of the "ProductStat" collection (case-sensitive)
               
        //             let: {"productId": {$toObjectId: "$_id"}},
                   
        //             as: 'productStats',
                 
        //           },
        //         },
                

               
        //       ])

//console.log(product2)          
return res.json(productWithStat)

}