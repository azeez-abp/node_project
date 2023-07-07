import React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';


// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//import { DateField } from '@mui/x-date-pickers/DateField';

import { 
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Alert,
  CircularProgress


} from '@mui/material';
import { VisibilityOffOutlined, VisibilityOutlined, CheckOutlined,CancelOutlined } from '@mui/icons-material';

import {useRegisterUserMutation} from './../../state/api'
import { useSelector,useDispatch } from 'react-redux';
import { setIsLoading } from '../../state';
import Logo from '../../components/Logo';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        ABP
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.



export default function Register() {
/**
 * Handle step in the form
 */

  const [activeStep, setActiveStep] =  useState(0);
  const [completed, setCompleted] =   useState({});
  //const [age, setAge] = React.useState('');
  const [passwordHidden,setPasswordHidden] = useState(true)
  const [state,setState]   = useState({})
  const [error,setError] = useState("")
 // const loading  = useSelector((state)=>console.log(state, "IS STATE"))
  const isLoading  = useSelector((state)=>state.global.isLoading)
  const [registerUserHandler]  = useRegisterUserMutation()
  const dispath    = useDispatch()
  const [respImg,setRespImg]   = useState("")
  const [success,setSuccess]   = useState("")
   
  const [securePassword,setSecurePassword] = useState({
    "has lowercase letter": false,
    "has uppercase letter":false,
    "has digit":false,
    "has sepecial character":false,
    "length must longer than eigth character":false
  }) 
  //console.log(registerUserHandler({'namme':"azees"}))

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    handleComplete()

  
      if(completed[activeStep]){
        const newActiveStep =
          isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
              // find the first step that has been completed
              steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
    
        }else{
          setError(`You have to complete  step ${activeStep+1}`)
          setTimeout(()=>{
            setError("")
          },3000)
        }
 
  

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
   if(completed[activeStep]) setActiveStep(step);
  };

  const handleComplete = () => {
       /////////////////////////////////////////////////////////////////////////
          if(state.fn && state.mn && state.ln && state.ge && state.db){
            const newCompleted = completed;
          newCompleted[0] = true;
          setCompleted(newCompleted);
         // handleNext();
          }else{
            const newCompleted = completed;
            newCompleted[0] = false;
            setCompleted(newCompleted);
          }
   ///////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////Second step end
          if(state.em && state.pa && state.rpa && state.pn){
            const newCompleted = completed;
          newCompleted[1] = true;
          setCompleted(newCompleted);
         // handleNext();
          }else{
            const newCompleted = completed;
            newCompleted[1] = false;
            setCompleted(newCompleted);
          }
   /////////////////////////////////////////////////////////////////////////





  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

/**
 *End  Handle step in the form
 */



  const handleCollectInput  = (ev)=>{
     if(ev.target){
        setState({...state,[ev.target.name]: ev.target.value})
     }else{
       
      let d  = `${[ev.$M+1<10?0+[ev.$M+1]:ev.$M+1 ]}/${[ev.$D<10?0+[ev.$D]:ev.$D]}/${[ev.$y]}`
      console.log(ev)
      setState({...state, db: d  })
     }
    
 }

  const hasError  = (error)=>{
    setError(error)
    setTimeout(()=>{
      setTimeout(setError(''),3000)
      dispath(setIsLoading(false))
    },2000)
  }
   
  const checkSecurePasswords  = (ev)=>{
    const password  = ev.target.value
    let securePass  = {
      ...securePassword ,
       "has lowercase letter": (password).match(/[a-z]/)?true:false, 
       "has uppercase letter":(password).match(/[A-Z]/)?true:false,
       "has digit":(password).match(/[0-9]/)?true:false,
       "has sepecial character":(password).match(/[@#$%^&+=!?]/)?true:false,
       "length must longer than eigth character": (password.length > 8)?true:false
      } 
      setTimeout(()=>{ setSecurePassword(securePass)},1000)
 }
  const handleSubmit = async (event) => {

 
    event.preventDefault();
   // console.log(event.currentTarget,useRegisterUserMutation)
     dispath(setIsLoading(true))
      
     if( ! (state.pa).match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!?]).{8,}$/) ){
         let err  = ``
          if(!(state.pa).match(/[A-Z]/)) err +=`Password must constain uppercase\n`
          if(!(state.pa).match(/[a-z]/)) err +="Password must constain lowercase\n"
          if(!(state.pa).match(/[0-9]/)) err +="Password must constain digit\n"
          if(!(state.pa).match(/[@#$%^&+=!?]/)) err +="Password must constain special character \n"
          if(!(state.pa).length < 8  ) err +="Password must be eight or more character in lenght"
 
          if(err)  hasError(err)

          return
     }
     
     if(state.pa !== state.rpa) return hasError('Password and repeat password are not equal')
     if( !(state.em).match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) ) return hasError('Invalid email addresss')

    const data = new FormData(event.currentTarget); 
    for(let i in state){
      data.append(i, state[i])
    }

   let hasRegister  = await  registerUserHandler(data)

   console.log(hasRegister.error)
   if(hasRegister.error){

     ///////////////////////
        hasError(hasRegister.error.error)
     //////////////////////

    return;
   }
    
   if(hasRegister.data.err){
    hasError(hasRegister.data.err)

    return
    
   }
   console.log(hasRegister.data.message )
   const responseImage  =process.env.REACT_APP_BASE_URL +(hasRegister.data.message).match(/(?<=public).+/)[0]
   console.log(responseImage)
   setRespImg(responseImage)
   setSuccess("Registration  completed, click Sign in button to login")
   setRespImg("")
   setTimeout(()=>{
  setTimeout(setRespImg(responseImage),3000)
    dispath(setIsLoading(false))
   
  },2000)
   
    
  };
  

  const getPasswordSecurity  = ()=>{
   
    return [Object.keys(securePassword), Object.values(securePassword)]
  
  }

  const passwordPtagStyle  = {
    padding:"0.2rem",
    margin: "0.2rem",
    textTransform:"capitalize",
    lineHeight:"2",
    borderRadius:"4px",
    width: "98%",
   //flex:1
  }
  const steps = [
           {
            text :"Personal details",
            component: (
            
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                 
                      name="fn"
                      required //will add star to the field
                      fullWidth
                      id="firstName"
                      label="First Name"
                      defaultValue={state.fn?state.fn:''}
                      autoFocus
                      onChange={handleCollectInput}
                      autoComplete='off'
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                   
                      name="mn"
                      required
                      fullWidth
                      id="firstName"
                      label="Middle Name"
                    
                      defaultValue={state.mn?state.mn:''}
                      onChange={handleCollectInput}
                      autoComplete='off'
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
              
                    <TextField
                      required
                      fullWidth
                      id="ln"
                      label="Last Name"
                      name="ln"
                      defaultValue={state.ln?state.ln:''}
                      onChange={handleCollectInput}
                      autoComplete='off'
                    />
                    </Grid>
                  <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                 <InputLabel id="gender-select-label">Gender *</InputLabel>
                    <Select
                      labelId="gender-select-label"
                    
                    // open={open}
                    // onClose={handleClose}
                    // onOpen={handleOpen}
              
                      label="Gender *"
                      name='ge'
                  //   onChange={handleChange}
                    value={state['ge']?state.ge:''}
                     
                      onChange={handleCollectInput}
                    >
                     
                      <MenuItem value={"male"} >Male</MenuItem>
                      <MenuItem value={"female"} >Female</MenuItem>
                    
                    </Select>
                 </FormControl>

                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DatePicker 
                      label={state.db?state.db:'Date of Birth'}
                     // name="db"   
                      //value={state.db?state.db:''}
                      // defaultValue={state.db?state.db:''}
                      onChange={handleCollectInput}
                        
                      />
                 {/* <DateField
                    label={state.db?state.db:'date of'}
                   // value={state.db?state.db:''}
                    onChange={handleCollectInput}
                    format="MM-DD-YYYY"
                    /> */}
                    </LocalizationProvider>
                  </Grid>
                  


                  </Grid>)
           },
           {
              text :"Contact details",
             component: (   
           
          <Grid container spacing={2}>
             <Grid item xs={12} >
              
              <TextField
                required
                fullWidth
                id="em"
                label="Email"
                type='email'
                name="em"
                autoComplete='off'
                defaultValue={state.em?state.em:''}
                onChange={handleCollectInput}
              />
             
              </Grid>

              <Grid item xs={12} sm={6}>
              
              <TextField
                required

                fullWidth
                id="pa"
                label="Password"
                type={passwordHidden?'password':'text'}
                name="pa"
                autoComplete='off'
                defaultValue={state.pa?state.pa:''}
                onChange={handleCollectInput}
                onInput={checkSecurePasswords}
              />
              </Grid>


              <Grid item xs={12} sm={6} sx={{position:"relative"}}>
              
              <TextField
                required

                fullWidth
                id="pa"
                label="Repeat Passwor"
                type={passwordHidden?'password':'text'}
                name="rpa"
                autoComplete='off'
                defaultValue={state.rpa?state.rpa:''}
                onChange={handleCollectInput}
              />
               <IconButton  sx={
                {position:"absolute",bottom:"10%"

               }} onClick={()=> setPasswordHidden(!passwordHidden)}>
                {passwordHidden? <VisibilityOffOutlined /> :<VisibilityOutlined />}  
                
              </IconButton>
              </Grid>
    
                
              {getPasswordSecurity()[0].map((text,index)=>{
                    console.log( getPasswordSecurity()[1][index])

                     return (
                      <Grid  xs={12}  key={index} item={true}  /*this will remove error and align items*/
                       sm={index ===4?12:6}>
                      {
                      getPasswordSecurity()[1][index] === true ?  
                      ( 
                           <p style={ {...passwordPtagStyle, ...{background:"green"}} } >{text} <CheckOutlined sx={{float:"right",margin:"2px"}} /></p>
                          )  
      
                        :(  
                            <p  style={ {...passwordPtagStyle, ...{background:"red"}} }>{text} <CancelOutlined sx={{float:"right",margin:"2px"}}/></p>
                        )
                      }
                        </Grid> )
                  })}
                


              <Grid item xs={12} sm={12}>
              
              <TextField
                required

                fullWidth
                id="pn"
                label="Phone number"
                type={'number'}
                name="pn"
                defaultValue={state.pn?state.pn:''}
                onChange={handleCollectInput}
                autoComplete='off'
              />
              </Grid>

            </Grid>
          
             )
           },
           {
            text :"Submit",
           component: (
           <>

            {
              respImg ?( 
                <><Avatar
               alt="Remy Sharp"
               src={respImg}
               sx={{ width: 56, height: 56 }}
           />
           </>  ):
           (  <TextField
                required

                fullWidth
                id="fl"
                label="file"
                type={'file'}
                name="img"
              //  defaultValue={state.pn?state.pn:''}
                onChange={handleCollectInput}
              //  autoComplete='off'
              />)
            }
          
           
            <Button
            type="submit"
            fullWidth
             disabled =   {isLoading?true:false}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up    &nbsp;{isLoading &&  <CircularProgress color="success" size={23} />}
          </Button></>)
         }
    ];






  return (
   
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width:"100%"
          }}
        >
          <Box component="form"  noValidate onSubmit={handleSubmit} sx={{ mt: 3,width:"100%" }}>
        {/*  */}
          <Box sx={{display:"flex",justifyContent:"center"}}>
             <Logo />
          </Box>
         
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
        {/*  */}
          {error && (  <Alert severity="error">{error.split("\n").map((line,index)=>(<p key={index}>{line}</p>) )}</Alert>)}
          {success && (  <Alert severity="success">{success}</Alert>)}



       <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}  /*with key you prevent filling next filed*/
            completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
           
            </StepButton>
          </Step>
        ))}
      </Stepper>
       {/*  */}
       <div>
        {allStepsCompleted() ? (
          <React.Fragment key={activeStep} /*with key you prevent filling next filed*/> 
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment key={activeStep} /*with key you prevent filling next filed*/>

            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {steps[activeStep]['text']}
            </Typography>
      
           {steps[activeStep]['component']}



              

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
                  {!isLastStep() && ( <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>)}
             

              {activeStep !== steps.length &&

                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) :
                 (
                  <>
                  {/* <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button> */
                    
                  }
                  </>
              
                )
                
                )}

          
            </Box>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </div>
       {/*  */}



          </Box>
      </Box>
      <Copyright />
   </Container>
  
  );
}