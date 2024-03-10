import React,{useState} from 'react'
import { Box,useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'

import MiniDrawer from '../../feature/client/Drawer'

// function getMinScreenWidth() {
//   var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
//   var minScreenWidth = window.innerWidth - scrollbarWidth;
//   return minScreenWidth;
// }
function Layout() {
  const isDesktop = useMediaQuery('(min-width:600px)');
  //console.log(isDesktop,getMinScreenWidth())
  // const [isSideBarOpen, setIsSideBarOpen] = useState(true)
   
  return (
    <Box width="100%" height="100%" display={isDesktop?"flex":"block"}>
         <MiniDrawer  isDesktop={isDesktop} />
    
       <Box 
      //  box for top bar
      className ="body-box "
        sx={
              {
                width:"100%",
                margin:"80px 0"
              }
            }>
          {/* <NavBar 
            isDesktop={isDesktop}
            isSideBarOpen ={isSideBarOpen}
            setIsSideBarOpen = {setIsSideBarOpen}
           

          /> */}
         
          <Outlet /> 
          {/* Outlet make children inside Layout appear */}
       </Box>
    </Box>
  )
}

export default Layout