import React,{useState} from 'react';
import { CircularProgress,Button,TextField,Grid,Link,Box,Typography,Container,Alert  } from '@mui/material';
import Logo from '../../components/Logo';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../../state';


import { useRequestPasswordMutation } from '../../state/api';



export default function ForgetPassword() {
  const {isLoading}  = useSelector((state)=>state.global)
  const [error,setError] = useState("")
  const [success,setSuccess]   = useState("")
  const dispath    = useDispatch()
  const navigate = useNavigate()
  const [handlePasswodRequest]  = useRequestPasswordMutation()

  const hasError  = (error)=>{
    /**
     * @param string 
     * @returns void
     * it will set error and remove error and loader in 3s
    */
    setError(error)
    setTimeout(()=>{
      setTimeout(setError(''),3000)
      dispath(setIsLoading(false))
    },2000)
  }
   /**
     * @param string 
     * @returns void
     * it will set error and remove error and loader in 3s
    */
  const hasSuccess  = (error)=>{
   
    setSuccess(error)
    setTimeout(()=>{
      setTimeout(setSuccess(''),3000)
      dispath(setIsLoading(false))
    },2000)
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    dispath(setIsLoading(true))
    const data = new FormData(event.currentTarget);
     const pass  =await handlePasswodRequest({email: data.get('email')})
     if(pass.error) return hasError(pass.error.error)
     if(pass.data) {
       if(pass.data.err) return hasError(pass.data.err)
       if(pass.data.suc)
       {
         hasSuccess(pass.data.suc)
         setTimeout(()=>{
          navigate('/login')
         },3000)
       
       }
   
     }

     console.log(pass)

   
  };

  return (
  
      <Container component="main" maxWidth="xs">
      
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
           <Logo></Logo>
          <Typography component="h1" variant="h5">
           Forget Password ?
           {error && (  <Alert severity="error">{error.split("\n").map((line,index)=>(<p key={index}>{line}</p>) )}</Alert>)}
          {success && (  <Alert severity="success">{success}</Alert>)}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading?true:false}
            >
              Make Request  &nbsp;{isLoading &&  <CircularProgress color="success" size={23} />}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  Login?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
 
  );
}