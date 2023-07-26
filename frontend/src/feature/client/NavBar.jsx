
import React, { useEffect, useState } from "react";
import {
LightModeOutlined,
DarkModeOutlined,
Menu as MenuIcon,
Search,
} from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import { useDispatch ,useSelector} from "react-redux";
import {setMode,setDialogue} from '../../state'
//import profileImage from "assets/profile.jpeg"; 
import { Toolbar, useTheme, IconButton, InputBase,AppBar,Menu,Button,MenuItem,Avatar} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserLogoutMutation} from "../../state/api";
//import AppBar from '@mui/material/AppBar';

/**
 * LeftNav - is the function that set the left element of the nav bar
 * Description:  left of nav bar contain search input and menu bar
 * @param: props destructure to get  isSideBarOpen , setIsSideBarOpen  alter isSideBarOpen value when menu bar is click 
 * @return: JSX-element
 
*/
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


/**
 * RightNav - function that set the right of the nav bar
 * Description: it handle all function for that 
 * set color mode, dippaly menu of profile image and logout
 * @return: JSX eleement  for color mode icon and profile menue
*/

const RightNav  = ()=>{

    const dispatch = useDispatch();
    const {currentUser,dialogue}  = useSelector((state)=>state.global)
  
    const navigate  = useNavigate()

    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [handleLogout]   = useUserLogoutMutation()
       
    /**
     * handleClick - function called when profile image menu button is click
     * Description: setAnchorEl is call to update the state of anchorEl by adding the children list to the menu
    */
    const handleClick = (event) => {
   
      setAnchorEl(event.currentTarget);
    };

    /**
     * handleClose - function called when profile image menu button is click
     * to clse the menu and remove the children items fro the list
    */
    const handleClose = () => {
      setAnchorEl(null);
    }

    /**
     * handleCallingLogouts - function that is called if yes button is press on dialogue JSX-Element
     * Description:  dispatch(setDialogue) is to update some dialogue oject property  
     * handleLogout api is called
     * logout.data.suc check for return data is successful,  dispatch(setDialogue) is called to update dialogue state
     * 
     * 
    */
    const handleCallingLogouts  =  async ()=>{
          
       try {
        dispatch(setDialogue({...dialogue, open:true,close:false, callback: false,text:`The system is login you out ${currentUser.first_name}` }   )   )
        const logout  = await handleLogout();
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

    /**
     * useEffect - call to handle calling of handleCallingLogouts function conditionaly
     * Description: the condition is when the dialogue.callback is true 
     * dialogue is a state with object located in ./state/index.js
     * if the yes on JSX-Element is press, dialogue.callback is set to true
     * and handleCallingLogouts will be call
     */
    useEffect(()=>{

      if(dialogue.callback){
        handleCallingLogouts  ()
      }

    },[dialogue.callback])

    /**
     * logout - function call when logout list child is click under profile image
     * Description:  dispatch(setDialogue) is called to update the state of the dialogue pane to dispaly
    */

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


/**
 * NavBar - function that dispaly nav bar
 * Description: it compose of  left and right bar
 * @return: JSX element
*/


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