import React from 'react'
import DailyChart from '../../components/DailyChart'
import { Box } from '@mui/material'
import GetUser from './GetUser'

function Daily() {
  return (
      <Box> 
              <GetUser />
             <DailyChart />
      </Box>  
  
  )
}

export default Daily