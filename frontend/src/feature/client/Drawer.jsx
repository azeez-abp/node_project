import React,{useState,useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import {
        //SettingsOutlined,
       // ChevronLeftOutlined,
     
        HomeOutlined,
        ShoppingCartOutlined,
        ReceiptLongOutlined,
        PublicOutlined,
        PointOfSaleOutlined,
       // TocOutlined,
        CalendarMonthOutlined,
        AdminPanelSettingsOutlined,
        TrendingUpOutlined,
        PieChartOutline,
        //ChevronLeft,
        Groups2Outlined,
        TodayOutlined,
        ArrowBack,
   
        ArrowForward,
        MailOutline,
       
       
       
       } from "@mui/icons-material"
import{ LeftNav, RightNav } from './NavBar';



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    color:theme.palette.secondary[200],
    
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



let navItems = [
        {
            text:"Dashboard",
            icon:<HomeOutlined/>
        },
        {
            text:"Client Facing",
            icon:null
        },
        {
            text:"Product",
            icon:<ShoppingCartOutlined/>
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

  /**
   * Dynamically adding item to sidebar list
   */  
const allow  = 1;
if(allow) {
    const len  = navItems.length-1
       
   const navItems2 =    [...navItems.splice(0,5), {
                text:"Inbox",
                icon:<MailOutline/>
            },
            ...navItems.splice(5,len)
        ]
        navItems =     [...navItems2,...navItems]

     //console.log(navItems2)  

            
}
/**
 * Alternative way of creating sibebar list, but not use
 */

const navItemsObj  = {
        Home : [{  text:"Dashboard",
                   icon:<HomeOutlined/>
                }],
        'Client Fancing': [
                   {
                        text:"Product",
                        icon:<ShoppingCartOutlined/>
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
                        icon:<PublicOutlined/>
                    }
        ]

}

const workNavItems  = ()=>{

    for(let i in navItemsObj){
       console.log(i,navItemsObj[i])
       navItemsObj[i].map(({text,icon},index)=> <></>)
    }

  
}
//console.log(workNavItems())

export default function MiniDrawer({isDesktop}) { 


        const {pathname}  = useLocation()//the current path
        const [active, setActive]   = useState("")
        const navigate  = useNavigate()
        const theme  = useTheme()// get theme and color
        const [open, setOpen] = useState(isDesktop);
       
   


        useEffect(()=>{
               
                setActive(pathname.substring(1))
            },[pathname])
          

        const handleDrawerOpen = () => {
        setOpen(true);
        };

        const handleDrawerClose = () => {
        setOpen(false);
        };
        
      
  return (
    <Box sx={{ display: 'flex' }}>
       
      <AppBar position="fixed" open={open}  
        sx={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-between",
                backgroundColor:theme.palette.background.alt

        }}
      >


         <LeftNav  open={open} handleDrawerOpen ={handleDrawerOpen}/>
    
         <RightNav />
        
      </AppBar>

      {/* <NavBar  open ={open} handleDrawerOpen  = {handleDrawerOpen}   />  */}







      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
        <Box display={"flex"} alignItems={"center"} gap={"0.5rem"}>
        <Typography variant='h4' fontWeight={"bold"} >
                                ABP APP
          </Typography> 

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ArrowForward />  : <ArrowBack />}
          </IconButton>
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
          {navItems.map(({text,icon}, index) => (
                
            <ListItem key={index} 
            disablePadding 
            sx={{ display: 'block' , 
            backgroundColor:active===text.toLowerCase()?theme.palette.secondary[300] :theme.palette.background.alt}}  
            
            onClick={()=>{
                           icon && navigate(`/${text.toLowerCase()}`)
                           icon && setActive(text.toLowerCase())
                      }  }
               >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
               { icon &&
                (<ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                  
                  title={text} 
                >
                  {icon}
                </ListItemIcon>)
               }
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }}  />
              </ListItemButton>
            </ListItem>
            
          ))}
        </List>
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
   
    </Box>
  );
}