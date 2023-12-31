import React, { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { setIs404 } from '../state';
import { useDispatch} from 'react-redux';
import { useUserProfileQuery, } from '../state/api'
//import { setCurrentUser, setIsLoading,setPageLoading } from '../state'

const NotFound = () => {

  const navigate= useNavigate();
  const dispatch   = useDispatch()
 console.log(useUserProfileQuery())
 //const {data,isError,isSuccess}  = useUserProfileQuery()

  const handleGoBack = () => {
    dispatch(setIs404(false))
    navigate(-1); // Redirect to the previous page
  };

  useEffect(()=>{
   //dispatch(setIs404(true))
  },[])
  return (
    <Box textAlign="center" py={10} sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        witdth:"100%",
        height:"100Vh"

    }}>
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button onClick={handleGoBack} variant="contained" color="primary">
        Go Back
      </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
