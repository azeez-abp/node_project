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
   
   const hasRetundata   = (data)=>{
    dispatch(setCurrentUser(data.data))
    setSessionExpires(false)
    dispatch(setPageLoading(false))
   }
   



  useEffect(()=>{


    const checkUserProfile  = async()=>{
      let callTime = 0;
      const max_cycle  = 5
      while(callTime <  max_cycle ) 
      {
       
  
        if(data){
          hasRetundata(data)
          break 
        }else{
         
          
          try {
             let {data}  =  await refetch()
             
             if(data.err){
              setTimeout(()=>{
                setSessionExpires(true)
              },1000)
              break
             }else{
              hasRetundata(data)
              break
             }

          } catch (error) {
            if(callTime ===  max_cycle -1 ) {
              setTimeout(()=>{
                setSessionExpires(true)
              },1000)
            }
            
           
          }

          console.log(data)
          
          //break
  
        }
         console.log( callTime++)
        callTime++
        if(callTime ===  max_cycle -1 )  setSessionExpires(true)
           //break
        
      }
     }
     checkUserProfile()
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
