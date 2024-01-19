import './App.css';
import { CssBaseline } from '@mui/material';
import {createTheme,ThemeProvider} from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { themeSettings } from './theme/theme';
import ClinetApp from './route/Client';

function App() {

  const {mode}  = useSelector((state)=>state.global) ///use selector contain all state inside d store 
  //
  // reducer is a state spread into state object
//  
  const theme  = useMemo(()=> createTheme(themeSettings(mode)) ,[mode] )
  return ( 
    <div className="app">


      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ClinetApp />
        
     
      </ThemeProvider>
   
     
    </div>
  );
}

export default App;
