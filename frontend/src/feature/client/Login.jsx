import React,{useState} from 'react';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '../../components/Logo';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useSelector,useDispatch } from 'react-redux';
import { setIsLoading,setWebToken,setCurrentUser } from '../../state';
import { useNavigate } from 'react-router-dom';

import { 

  IconButton,
  Alert,
  CircularProgress,


} from '@mui/material';

import {useLoginUserMutation } from '../../state/api';
// import pkg from 'base-64';
// const {decode: atob, encode: btoa} = pkg;


/**
 * Login - function that handle login 
 * @return JSX element
*/
export default function Login() {
  //console.log(btoa(JSON.stringify([3,4,2,0,1])))

  const {isLoading}  = useSelector((state)=>state.global)
  const [error,setError] = useState("")
  const [success,setSuccess]   = useState("")
  const dispath    = useDispatch()
  const navigate = useNavigate()
  const [passwordHidden,setPasswordHidden] = useState(true)
  const [loginHandler]   = useLoginUserMutation()




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

  const handleSubmit =async (event) => {
      console.log(event.currentTarget)
    event.preventDefault();
    dispath(setIsLoading(true))

    const data = new FormData(event.currentTarget);
    console.log(data,  data.get('email').length)
    if(data.get('email').length === 0){
     return hasError("Email is required")
    }
   
    if(data.get('password').length === 0 ){
     return hasError("Password is required")
    }
   
   
     //console.log( process.env.REACT_APP_BASE_URL, process.env.REACT_APP_ACCESS_TOKEN,process.env.REACT_APP_ACCESS_TOKEN_KEY )
     try {
     
      const login   = await loginHandler({
        email: data.get('email'),
        password: data.get('password'),
        remember: data.get('remember'),
      })
       // console.log(login.error.data )
       if(login.error){
          if(login.error.data)  return hasError(login.error.data.err)
        return hasError(login.error.error)
       }
       

       if(login.data.err){
        return hasError(login.error.data.err)
        }
      //JSON.parse(atob(process.env.REACT_APP_ACCESS_TOKEN_KEY))
     //let out= crypto.decode(login.data.accessToken,process.env.REACT_APP_ACCESS_TOKEN,JSON.parse(atob('WzMsNCwyLDAsMV0='))  )
     ///save the encrypted token in storage
   
     dispath(setCurrentUser(login.data.user))
     localStorage.setItem("APP_ACCESS_TOKEN",JSON.stringify(login.data.accessToken) ) 
  

  ///   console.log(out)
     hasSuccess("Login done")
     dispath(setWebToken(login.data.accessToken))
     setTimeout(() => {
       //if(out) 
       navigate('/dashboard')
     }, 2000);
      
     } catch (error) {
        console.log(error.message,error)
        hasError(error.message)
     }
     
  
  };



  return (
  
      <Container component="main" maxWidth="xs"
        sx={{
          display:"flex",
          flex:1,
          width:"100%",
          height:"100vh",
          alignItems:"center",
          justifyContent:"center"
        }}
      >
      
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         <Logo />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && (  <Alert severity="error">{error.split("\n").map((line,index)=>(<p key={index}>{line}</p>) )}</Alert>)}
          {success && (  <Alert severity="success">{success}</Alert>)}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1,position:"relative" }}>
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
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type= {passwordHidden? "password":"text"}
              id="password"
              autoComplete="current-password"
            />
              <IconButton  sx={
                {position:"absolute",top:"97px",right:"2px",background:"#000000",borderRadius:'0px',padding:"0.6em"

               }} onClick={()=> setPasswordHidden(!passwordHidden)}>
                {passwordHidden? <VisibilityOffOutlined /> :<VisibilityOutlined />}  
                
              </IconButton>
        

            <FormControlLabel
              control={<Checkbox value={true} color="primary"  name='remember'/>}
              label="Remember me"
            />
           <Button
            type="submit"
            fullWidth
            disabled =   {isLoading?true:false}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
           Sign in   &nbsp;{isLoading &&  <CircularProgress color="success" size={23} />}
          </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forget-password" variant="body2">
                  Forgot password?
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