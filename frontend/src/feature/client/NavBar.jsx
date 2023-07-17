
import React, { useEffect, useState } from "react";
import {
LightModeOutlined,
DarkModeOutlined,
Menu as MenuIcon,
Search,
//SettingsOutlined,
//ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import { useDispatch ,useSelector} from "react-redux";
import {setMode,setDialogue} from '../../state'
//import profileImage from "assets/profile.jpeg"; 
import { Toolbar, useTheme, IconButton, InputBase,AppBar,Menu,Button,MenuItem,Avatar} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserLogoutMutation} from "../../state/api";
//import AppBar from '@mui/material/AppBar';

////////////////////////////////////Left of Nav
const LeftNav  = ({isSideBarOpen,setIsSideBarOpen})=>{
    const theme = useTheme();
    return (
        <FlexBetween>
        <IconButton aria-label="" onClick={()=>setIsSideBarOpen(!isSideBarOpen) }>
          <MenuIcon />
          
          
        </IconButton>   
       <FlexBetween  
       backgroundColor={theme.palette.background.alt} 
       borderRadius={"9px"}
       gap={"3rem"}
       p={"0.1rem 1.5rem"}
        >
        <InputBase placeholder="Search...." />
        <IconButton>
           <Search />
        </IconButton>
       </FlexBetween>
</FlexBetween>
    )
}
///////////////////////////////////////////////Left of Nav



const RightNav  = ()=>{

    const dispatch = useDispatch();
    const {currentUser,dialogue}  = useSelector((state)=>state.global)
  
    const navigate  = useNavigate()

    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [handleLogout]   = useUserLogoutMutation()
       
    const handleClick = (event) => {
   
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    }

    const handleLogouts  =  async ()=>{
          
       try {
        dispatch(setDialogue({...dialogue, open:true,close:false, callback: false,text:`The system is login you out ${currentUser.first_name}` }   )   )
        const logout  = await handleLogout();
        console.log(logout) 
        if(logout.data.suc){
          dispatch(setDialogue({...dialogue, open:true,close:false, callback: false,text:`Bye bye ${currentUser.first_name}` }   )   )
        }
        localStorage.removeItem("APP_ACCESS_TOKEN")
         setTimeout(()=>{ 
          dispatch(setDialogue({...dialogue, open:false,close:true, callback: false,text:`` }   )   )
             navigate("/login")
         },3000)
     
       } catch (error) {
        
       }
    
    }

    useEffect(()=>{
      if(dialogue.callback){
        handleLogouts ()
      }
    },[dialogue.callback])

    const logout  = ()=>{

    
  
        dispatch(setDialogue({...dialogue, open:true,close:false, callback: false,text:"Are you sure to logout" }   )   )


 
   
    }
    
    return (
        <FlexBetween gap={"1.5rem"} >
          <IconButton 
          onClick={()=>dispatch( setMode() )} 
          
          >
             {theme.palette.mode==='dark'
              ?(<DarkModeOutlined    sx={{fontSize:"25px"}}/>)
              :(<LightModeOutlined   sx={{fontSize:"25px"}}/>)
             }
          </IconButton>

          <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          color:"#ccc"
        }}
      > 

        <Avatar alt="Remy Sharp" src={`${process.env.REACT_APP_BASE_URL }${currentUser &&  currentUser.profile_img.match(/(?<=public).+/)[0]}`} />
          {currentUser&& "Welcome "+currentUser.first_name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>navigate('/profile')}>Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
        </FlexBetween>
    )
}

function NavBar(props) {
const {isSideBarOpen,setIsSideBarOpen} = props
  console.log(props,"props")

  return (
    <AppBar  sx={{
        position:"static",
        background:"none",
        boxShadow:"none",
        width:"100%"

    }}>

    <Toolbar sx={{justifyContent:"space-between"}} >
      <LeftNav  
       isSideBarOpen = {isSideBarOpen}
       setIsSideBarOpen  ={setIsSideBarOpen}

      />
      <RightNav />
       
    </Toolbar>

    </AppBar>
  )
}

export default NavBar