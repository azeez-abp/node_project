import React, { useEffect, useState } from 'react';
//import {useNavigate } from 'react-router-dom';
import { Box, Typography,  } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useUserProfileQuery, } from '../../state/api'
import { setCurrentUser ,setPageLoading } from '../../state'



const PageLoading = () => {
  //const navigate= useNavigate();
  const dispatch   = useDispatch()
  //const [hasProfile,setHasProfile]  = useState(false)
  const [loadCount, setLoadCount] = useState(0)
  const [loadingDot,setLoadingDot] = useState("")

 const {
  data,
  // isError,
  // isSucces
  refetch
}  =  useUserProfileQuery()
 const [sessionExpired,setSessionExpires]  = useState(false)


const hasReturnData   = (data)=>{
    dispatch(setCurrentUser(data.data))
    setSessionExpires(false)
    dispatch(setPageLoading(false))
   }
   

const checkUserProfile  = async()=>{
      let callTime = 0;
      const max_cycle  = 5
      while(callTime <  max_cycle ) 
      {
       
       
        if(data){
          hasReturnData(data)
          break 
        }else{
         
           
          try {
             let {data}  =  await refetch()
             console.log(data, "data 2", "undefined"===data)
              
             if(data.err){
              setTimeout(()=>{
                setSessionExpires(true)
              },1000)
              break
             }else{
              hasReturnData(data)
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
        
        callTime++
        setLoadCount(callTime)
        if(loadCount ===  max_cycle -1 )
        {
            break
        }else{
           setSessionExpires(true)
        }

  
        
      }
     }


  useEffect(()=>{
     /**
      * Handle doting in loading
      */
      let dotCount = 1;
      setInterval(()=>{
        dotCount++
        let  dot = ""
         for (let i = 0; i < dotCount; i++) {
          dot +="."
          
         }
        setLoadingDot(dot)
        if(dotCount === 5) dotCount =1
      },200)
     /**
      * Checking user profile
      */
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
        <span>Loading</span>  <span style={{
          display:"block",
          float:"right",
          width:"50px"
        }}>{loadingDot}</span>
      </Typography>)
       }
    
     
      </Box>
    </Box>
  );
};

export default PageLoading;
