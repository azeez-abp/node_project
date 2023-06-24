import './App.css';
import { CssBaseline,ThemeProvider } from '@mui/material';
import {createTheme} from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { themeSettings } from './theme/theme'
import  Dashboard  from './scenes/dashboard/dashboard';
import Layout from './scenes/layout/index';

function App() {

  const colorModel  = useSelector((state)=>state.global.mode) ///use selector contain all state inside dstore 
  // reducer is a state spread into state object
  const theme  = useMemo(()=> createTheme(themeSettings(colorModel)), [colorModel]    )
  return ( 
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
           <Route  element={<Layout />}/>
           <Route path='/'  element = {<Navigate to={'dashboard'}  replace/>} />
           <Route path='/dashboard'  element = {<Dashboard />} />
        </Routes>
      </ThemeProvider>
      </BrowserRouter> 
     
    </div>
  );
}

export default App;
