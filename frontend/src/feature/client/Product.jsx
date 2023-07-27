import React , {useEffect}from 'react'
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

function Product() {

const {data,refresh,isloading}  = useGetProductQuery()

const isMobile  = useMediaQuery("(min-width:100px)")
        


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
          {data || !isloading ? (<Box 
                                        mt={"20px"} display={"grid"} 
                                        gridTemplateColumns={"repeat(4 , minmax(0, 1fr))"} 
                                        rowGap={"20px"}
                                        columnGap={"1.33%"}
                                        sx={
                                                {  /**target all div under box div and apply style*/
                                                   "& > div" : {gridColumn:isMobile ? undefined : "span 4"}     
                                                }
                                        }
          
          ></Box>) : (<Box>Loading...</Box>)}
    </Box> 
    </Box>
  )
}

export default Product