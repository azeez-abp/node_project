import React from 'react'
import GetUser from './GetUser'
import {Box,useMediaQuery} from '@mui/material'
import MetricsCard from '../../components/MetricsCard'
//import { useGetProductQuery } from '../../state/api'
import { Email, VerifiedUser } from '@mui/icons-material'
import OverviewChart from '../../components/OverviewChart'




function Dashboard() {

  const isDesktop = useMediaQuery('(min-width:600px)');
  //const {data}    = useGetProductQuery()
  return (
    <div style={ isDesktop? {width:"100%", margin: "3px 3px"} :{
          width:" 90%",
         margin: "10px 46px"
    }}>
    <GetUser />
     <Box
       //grid width 8 colums
       display = {"grid"}
       gridTemplateColumns={"repeat(12, 1fr)"}//12 column on each row with dimention if 1fr 
       gridAutoRows={"160px"}
       gap={"20px"}
       sx={{
        // "& > div" : {gridColumn:1}
       }}

 
     > 
      <MetricsCard 
       title={"Total  Customer"}
       value={"120"}
       increament={"12%"}
       description={"Total Customer"}
       icon={<VerifiedUser/>}

  
     />
     <MetricsCard 
       title={"Total  Customer"}
       value={"120"}
       increament={"12%"}
       description={"Total Customer"}
       icon={<Email></Email>}

  
     />
     <Box
       gridColumn= {isDesktop?  "span 8" : "span 12"}
       gridRow  = { isDesktop? "span 2" : "span 12"}
       //height={"70vh"}
       padding={0}
       margin={"-43px  0 "}
     >
     <OverviewChart />

     </Box>

     <MetricsCard 
       title={"Total  Customer"}
       value={"120"}
       increament={"12%"}
       description={"Total Customer"}
       icon={<Email></Email>}

  
     />
      <MetricsCard 
       title={"Total  Customer"}
       value={"120"}
       increament={"12%"}
       description={"Total Customer"}
       icon={<Email></Email>}

  
     />
   

      
     </Box>
    </div>
  )
}

export default Dashboard