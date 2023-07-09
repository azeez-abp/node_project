import './App.css';
import { CssBaseline } from '@mui/material';
import {createTheme,ThemeProvider} from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { themeSettings } from './theme/theme';
//import  Dashboard  from './scenes/dashboard/dashboard';
import Dashboard from './feature/client/Dashboard';
import Layout from './scenes/layout/index';
import Register from './feature/client/Register';
import NotFound from './components/NotFound';
import Login from './feature/client/Login';
import ForgetPassword from './feature/client/ForgetPassword';
import ResetPassword from './feature/client/ResetPassword';

function App() {

  const {mode,is404,pageLoading}  = useSelector((state)=>state.global) ///use selector contain all state inside dstore 
  // reducer is a state spread into state object
  const theme  = useMemo(()=> createTheme(themeSettings(mode)), [mode]    )
  return ( 
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
         {!pageLoading  
         ?(
        <Routes>
        <Route path='/'  element = {<Navigate to={'register'}  replace/>} />
           <Route path='/register'  element = {<Register />} />

            <Route path='/login' element={<Login />}   />
            <Route path='/forget-password' element={<ForgetPassword />}   />
            <Route path='/reset-password/:email/:token' element={<ResetPassword />}   />
             {/* Outle route */}
            <Route  element={<Layout />}>
           {/* The Layout contains the outlet and Every Route below represent the children */}
           <Route path='/dashboard'  element = {<Dashboard />} />
          </Route> 
        {/* Outle route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
         )
         :(
          <div className='loader' 
            style={{
               display:"flex",
               alignItems:"center",
               justifyContent:"center",
               witdth:"100%",
               height:"100Vh"

            }}
          >
           <div><p> Loading </p></div>
         
         
         </div>
         )
         }


      </ThemeProvider>
      </BrowserRouter> 
     
    </div>
  );
}

export default App;
