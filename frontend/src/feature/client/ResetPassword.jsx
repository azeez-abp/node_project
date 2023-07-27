
import React,{useState} from 'react';
import { CircularProgress,Button,TextField,Grid,Link,Box,Typography,Container,Alert  } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../../state';
import Logo from '../../components/Logo';
import { useResetPasswordMutation } from '../../state/api';

import { useParams } from 'react-router-dom';

export default function ResetPassword() {

  const {isLoading}  = useSelector((state)=>state.global)
  const [error,setError] = useState("")
  const [success,setSuccess]   = useState("")
  const dispath    = useDispatch()
  const navigate = useNavigate()
  const [resetPasswordHaldler]    = useResetPasswordMutation()
  const { email, token } = useParams();

  
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
  const checkPasword  = (password,repeatPassword)=>{
       if(password !== repeatPassword) {
        hasError("Passwor and repreat password are not equall")
        return  false
       }


       if( ! (password).match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!?]).{8,}$/) ){
        let err  = ``
         if(!(password).match(/[A-Z]/)) err +=`Password must constain uppercase\n`
         if(!(password).match(/[a-z]/)) err +="Password must constain lowercase\n"
         if(!(password).match(/[0-9]/)) err +="Password must constain digit\n"
         if(!(password).match(/[@#$%^&+=!?]/)) err +="Password must constain special character \n"
         if(!(password).length < 8  ) err +="Password must be eight or more character in lenght"

         if(err) {
                hasError(err)
                return  false
         }

        
    }

      return true
  }
  const handleSubmit = async(event) => {
    dispath(setIsLoading(true))
 
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    
        
    try {
         if(checkPasword(data.get('password'), data.get('rpassword'))){
              let req  = await resetPasswordHaldler({
                                                        email,token,
                                                      rpassword: data.get('rpassword'),
                                                      password: data.get('password'),
                                                    })
          if(req.error) return hasError("Unexpected error occured, try again")

          if(req.data){
            if(req.data.err)  return hasError(req.data.err)
             
           hasSuccess(req.data.suc)
           setTimeout(()=>{
            navigate('/login')
           },3000)
          }
                                                      
        
      }
    
    } catch (error) {
      return hasError(error.message)
    }
   

   
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
         <Logo />
          <Typography component="h1" variant="h5">
             Reset Password
             {error && (  <Alert severity="error">{error.split("\n").map((line,index)=>(<p key={index}>{line}</p>) )}</Alert>)}
             {success && (  <Alert severity="success">{success}</Alert>)}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
         
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

          <TextField
              margin="normal"
              required
              fullWidth
              name="rpassword"
              label="Repeat Password"
              type="password"
              id="rpassword"
              autoComplete="current-password"
            /> 
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading?true:false}
            >
             Set Password &nbsp;{isLoading &&  <CircularProgress color="success" size={23} />}
              {/* {email} {token} */}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  Login 
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