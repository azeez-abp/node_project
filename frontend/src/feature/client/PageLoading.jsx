import React, { useEffect, useState } from 'react';
//import {useNavigate } from 'react-router-dom';
import { Box, Typography,  } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useUserProfileQuery, } from '../../state/api'
import { setCurrentUser ,setPageLoading } from '../../state'



const PageLoading = () => {
  //const navigate= useNavigate();
  const dispatch   = useDispatch()
  const [hasProfile,setHasProfile]  = useState(false)

 const {
  data,
  // isError,
  // isSucces
  refetch
}  =  useUserProfileQuery()
 const [sessionExpired,setSessionExpires]  = useState(false)

/**   const handleGoBack = () => {
   
    navigate(-1); // Redirect to the previous page
  };*/


  useEffect(()=>{
    refetch().then(userProfile=>{
    
       if(!userProfile.data){
        setTimeout(()=>{
          setSessionExpires(true)
        },3000)
        return
       }
       if(userProfile.status === 'fulfilled' ){
        dispatch(setCurrentUser(data.data))
        setSessionExpires(false)
        dispatch(setPageLoading(false))
       }
       if(data && data.err){
        return   dispatch(setCurrentUser(null))
      }
    }).catch(err=>{
       setTimeout(()=>{
         setSessionExpires(true)
       },3000)
    })




   //dispatch(setIs404(true))
    
  },[data])




  return (
    <Box textAlign="center" py={10} sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        witdth:"100%",
        height:"100Vh"

    }}>
    <Box>
       {
        sessionExpired?(<Box>
              <Typography variant='h4'   >Session has expired.  <a href='/login'   > Login</a></Typography>
        </Box>):(  <Typography variant="h4" component="h1" gutterBottom>
           Loading
      </Typography>)
       }
    
     
      </Box>
    </Box>
  );
};

export default PageLoading;
