import React, { useEffect, useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useDispatch ,useSelector} from 'react-redux';
import { useUserProfileQuery, } from '../../state/api'
import { setCurrentUser, setIsLoading,setPageLoading } from '../../state'



const PageLoading = () => {
  const navigate= useNavigate();
  const dispatch   = useDispatch()

 const {data,isError,isSuccess}  = useUserProfileQuery()
 const [sessionExpired,setSessionExpires]  = useState(false)

  const handleGoBack = () => {
   
    navigate(-1); // Redirect to the previous page
  };

  useEffect(()=>{
    if(data){
        dispatch(setCurrentUser(data.data))
        setSessionExpires(false)
        dispatch(setPageLoading(false))
    }else{
       setSessionExpires(true)
    } 
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
