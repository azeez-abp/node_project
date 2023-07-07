import React,{Fragment} from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material"

import {
 SettingsOutlined,
 ChevronLeftOutlined,
 ChevronRightOutlined,
 HomeOutlined,
 ShoppingCartOutlined,
 ReceiptLongOutlined,
 PublicOutlined,
 PointOfSaleOutlined,
 TocOutlined,
 CalendarMonthOutlined,
 AdminPanelSettingsOutlined,
 TrendingUpOutlined,
 PieChartOutline,
 ChevronLeft,
 Groups2Outlined,
 TodayOutlined,
 ArrowBack,



} from "@mui/icons-material"

import { useState,useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import FlexBetween from './FlexBetween'
import profileImage from './../images/az.jpeg'

function SideBar({drawerWidth,isSideBarOpen,setIsSideBarOpen,isDesktop})
 {
  
    const {pathname}  = useLocation()//the current path
    const [active, setActive]   = useState("")
    const navigate  = useNavigate()
    const theme  = useTheme()// get theme and color
    
    useEffect(()=>{
        console.log(pathname," IS PATH NAME")
        setActive(pathname.substring(1))
    },[pathname])
  

    const navItems = [
        {
            text:"Dashboard",
            icon:<HomeOutlined/>
        },
        {
            text:"Client Facing",
            icon:null
        },
        {
            text:"Customer",
            icon:<Groups2Outlined/>
        }
        ,
        {
            text:"Transaction",
            icon:<ReceiptLongOutlined/>
        },
        {
            text:"Geography",
            icon:<HomeOutlined/>
        },
        {
            text:"Geography",
            icon:<PublicOutlined/>
        },
        {
            text:"Sales",
            icon:null
        },
        {
            text:"Overview",
            icon:<PointOfSaleOutlined/>
        },
        {
            text:"Daily",
            icon:<TodayOutlined/>
        },
        {
            text:"Montly",
            icon:<CalendarMonthOutlined/>
        },
        {
            text:"Breakdown",
            icon:<PieChartOutline/>
        },
        {
            text:"Management",
            icon:null
        },
        {
            text:"Admin", 
            icon:<AdminPanelSettingsOutlined/>
        },
        {
            text:"Performance",
            icon:<TrendingUpOutlined/>
        }
    ]

 const ListItemsComponent = ()=>{

   return ( navItems.map(({text,icon},key)=> {
          
    if(!icon){
        return (
                <Fragment key={key}>
                    <Typography  key={key} sx={{m:"1.25rem"}}>{text}</Typography>
                    {/* for display text  */}
                </Fragment>
                
        
            )  
    }

    const lcText = text.toLocaleLowerCase()

   return (
 
      <List key={key}>
        <ListItem  sx={{
                        cursor:"pointer", 
                        backgroundColor:active===lcText?theme.palette.secondary[300] :"transparent",
                        justifyContent: active===lcText? "space-between":"flex-start"
                        }}  

                        onClick={()=>{
                           navigate(`/${lcText}`)
                          setActive(lcText)
                      }  
                }   >

               <IconButton 
            sx={{
                m:"-0.5rem 0rem 0rem 0rem;",
                color:active===lcText
                  ?theme.palette.primary[500]
                  :theme.palette.secondary[200]
                }}
            >
                 {icon!==null?icon:null}
             </IconButton>  
            <Typography>

             {text}   
             
            
            </Typography>
            {active===lcText && ( <IconButton> <ChevronRightOutlined />  </IconButton>  )}
        </ListItem>
      </List>

    ///////////////////////////////////////////////////////////////////
    /*
        <Box key={key} 
          sx={{ display:"flex", }}
         >
           <Box 
           sx={{
            display:"flex",
           flexDirection:"row",
            m:"0.5rem 0;",
           cursor:"pointer",
           flexWrap:"nowrap" ,
           alignItems:"center" ,
           padding:"0.4rem",
          // justifyContent:"space-evenly"
           backgroundColor:active===lcText?theme.palette.secondary[300]:"transparent",
           color:active===lcText?theme.palette.primary[600]:theme.palette.secondary[200],
           width:"100%"
           
            }}  
           onClick={()=>{ navigate(`/${lcText}`)
                          setActive(lcText)
                      }  
                }   
           >
           <Box>
           <IconButton 
            sx={{
                m:"-0.5rem 0rem 0rem 0rem;",
                color:active===lcText
                  ?theme.palette.primary[500]
                  :theme.palette.secondary[200]
                }}

           
            
            >
                 {icon!==null?icon:null}
             </IconButton>
           </Box>

            <Box>
            <Typography
             >{text}
             
            
             </Typography> 
            </Box>
            
             <Box sx={{m:"0 4 .4rem"}}>
                    {active===lcText && (
                <IconButton> <ChevronRightOutlined />  </IconButton>
                
                                        
                            )}
             </Box>
        
           </Box>
        </Box>
        */
         ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
        ) 

   } )

)

 }   
   
    const GetDrawer = ()=>{
        const theme = useTheme();
        return (
            <Drawer 
               open={isSideBarOpen}
               onClose={()=>setIsSideBarOpen(false)}
               variant='persistent'
               anchor='left'
               sx={
                {
                  width: drawerWidth,
                  "& .MuiDrawer-paper":{
                    color:theme.palette.secondary[200],
                    boxSizing:"border-box",
                    borderWidth:isDesktop?0:"2px", 
                    width: drawerWidth,


                  }
                }
               }

            >
                <Box width={"100%"}>
                
                    <Box m={"1.5rem 2rem 2rem 3 rem"}>
                        <FlexBetween color={theme.palette.secondary.main}>
                          <Box display={"flex"} alignItems={"center"} gap={"0.5rem"}>
                             <Typography variant='h4' fontWeight={"bold"} >
                                ABP APP
                             </Typography> 
                             {/* The Typography component makes it easy to apply a
                              default set of font weights and sizes in your application. */}
                          </Box>
                         {!isDesktop && (<IconButton onClick={()=>setIsSideBarOpen(!isSideBarOpen)}><ArrowBack/></IconButton>)}
                        </FlexBetween>
                    </Box>
                    
                      <ListItemsComponent/>
                      

                   </Box>
            </Drawer>
        )
    }

  return (
    <Box component={"nav"}>
        <GetDrawer />
    </Box>
    
  )
}

export default SideBar