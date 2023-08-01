import { Box, FormControl, MenuItem, Select } from '@mui/material'
import GetUser from "./GetUser"
import React, { useState } from 'react'
import OverviewChart from '../../components/OverviewChart'

function Stat() {
        const [view,setView]   = useState("units")
  return (
    <Box 
   
    height={"90vh"}

    >
       <GetUser/>
          <FormControl>
              <Select
               value ={view}
               label = "View"
               onChange={(e)=>{setView(e.target.value)}}
              >
               <MenuItem value  = {"sales"}>Sales</MenuItem>
               <MenuItem value= {"units"}>Units</MenuItem>
              </Select>
             
          </FormControl>
             <OverviewChart  view={view}  isDashbaord={false} />
    </Box>
  )
}

export default Stat