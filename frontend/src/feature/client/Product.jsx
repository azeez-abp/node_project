import React , {useEffect, useState}from 'react'
import { 
        Box,
        Card,
        CardActions,
        CardContent,
        Collapse,
        Button,
        Typography,
        Rating,
        useTheme,
        useMediaQuery
 } from '@mui/material'

import { useGetProductQuery } from '../../state/api'
import GetUser from './GetUser'

const ProductTag  = (productdata)=>{
 //console.log(productdata.productdata)
   const {  _id,
        name,
        description,
        price,
        rating,
        category,
        supply,
        yearlySalesTotal,
        yearlyTotalSoldUnits

       }   = productdata.productdata
      const theme = useTheme()
      const [isExpanded,setIsExpanded]  = useState(false)

      return (
        <Card
        sx={
          { 
                backgrountImage:"none",
                // backgroundColor : theme.palette.background.alt,
                borderRadius:"0.55rem"
          }
        }
        >
         <CardContent >
                <Typography>Category: {category}</Typography>
                <Typography>Name: {name}</Typography>
                <Typography>Price: {Number(price).toFixed(2)}</Typography>
                <Rating value={rating} precision={0.5}/>
                <Typography>Description: {description}</Typography>
         </CardContent>
         <CardActions
          
          >
                <Button variant='primary' size='small' onClick={()=>setIsExpanded(!isExpanded)}>See more</Button>
         </CardActions>
         <Collapse
           in ={isExpanded}
           timeout="auto"
           unmountOnExit
           sx={{color:theme.palette.neutral[300]}}
         >
          <CardContent>
                 <Typography>id {_id}</Typography>
                 <Typography>Supply left : {supply}</Typography>
                 <Typography>Yearly Sale  Total: {yearlySalesTotal.join(',')}</Typography>
                 <Typography>Yearly Sale Unit: {yearlyTotalSoldUnits.join(",")}</Typography>
          </CardContent>
         </Collapse> 
        </Card> 
      )
}



function Product() {

const {data,refetch,isloading}  = useGetProductQuery()
const [products,setProducts]  = useState(null)
//console.log(data)


const isMobile  = useMediaQuery("(min-width:100px)")
        
useEffect(()=>{
        refetch().then(products=>{
         // console.log(products)
          if(products) return setProducts(products.data)
        }).catch(error=>{

        })
},[])

/**
 * rem make dimension consistent across browser
 * One dimensional layer: flexbox
 * two dimenstional layer: grid
 * repeat(4 , minmax(0, 1fr) 4 item per row ; size min is 0 max is 1fr
 */ 
  return (
    <Box>
    <GetUser />
    <Box m={"1.5rem 2.5rem"}>
          {products? (<Box 
                                        mt={"20px"} display={"grid"} 
                                        gridTemplateColumns={"repeat(4 , minmax(0, 1fr))"} 
                                        rowGap={"20px"}
                                        columnGap={"1.33%"}
                                        sx={
                                                {  /**target all div under box div and apply style*/
                                                   "& > div" : {gridColumn:isMobile ? undefined : "span 4"}     
                                                }
                                        }
          
                               >
                                   {
                                        products &&  products.map((product,key)=>{return <ProductTag key={key} productdata={product} > </ProductTag>} )
                                   }
                                
                                </Box>) : (<Box>Loading...</Box>)}
    </Box> 
    </Box>
  )
}

export default Product