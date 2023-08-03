import { Box, Typography,useTheme,useMediaQuery } from '@mui/material'
import React from 'react'
import FlexBetween from './FlexBetween'

function MetricsCard({title,value,increament,icon, description}) {
        //aka data cark
        const theme  = useTheme()
        
  const isDesktop = useMediaQuery('(min-width:600px)');
        

  return (
    <Box
       gridColumn={isDesktop? "span 2" : "span 12"}
       gridRow  = {"span 1"}
       display={"flex"}
       flexDirection={"column"}
       justifyContent={"space-between"}
       p={"1.25rem 1rem"}
       flex={"1 1 100%"} 
       backgroundColor  = {theme.palette.background.alt}
       borderRadius={"0.55rem"}
       >
       <FlexBetween>
         <Typography variant='h6' sx={{color:theme.palette.secondary[100]}}>{title}</Typography>
           {icon}
       </FlexBetween>
       
       <Typography variant='h3' fontWeight={"6000"} sx={{color:theme.palette.secondary[200]}}>{value}</Typography>
 
       <FlexBetween >
         <Typography variant='h6' sx={{color:theme.palette.secondary.light}}>  {increament}</Typography>
         <Typography variant='h6' sx={{color:theme.palette.secondary.light}}>  {description}</Typography>
       </FlexBetween>

      
       
    </Box>
  )
}

export default MetricsCard