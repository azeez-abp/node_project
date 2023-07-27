import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../feature/client/Dashboard';
import Layout from '../scenes/layout/index';
import Register from '../feature/client/Register';
import NotFound from '../components/NotFound';
import Login from '../feature/client/Login';
import ForgetPassword from '../feature/client/ForgetPassword';
import ResetPassword from '../feature/client/ResetPassword';
import PageLoading from '../feature/client/PageLoading';
import DialoguePane from '../components/DialoguePane';
import '../App.css';
import Product from '../feature/client/Product';
import ProductOnTable from '../feature/client/ProductOnTable';

function ClinetApp() {

  const {dialogue,pageLoading}  = useSelector((state)=>state.global) ///use selector contain all state inside dstore 
  //
  // reducer is a state spread into state object
//  
  //const theme  = useMemo(()=> createTheme(themeSettings(mode)) ,[mode] )
  return ( 
    <div className="client-app">
        <DialoguePane
           dialogue  = {dialogue}
          />
    <BrowserRouter> 
    
   

         {!pageLoading  
         ?(
       <Routes> 
        <Route path='/'  element = {<Navigate to={'dashboard'}  replace/>} />
           <Route path='/register'  element = {<Register />} />

            <Route path='/login' element={<Login />}   />
            <Route path='/forget-password' element={<ForgetPassword />}   />
            <Route path='/reset-password/:email/:token' element={<ResetPassword />}   />
             {/* Outle route */}
            
            <Route  element={<Layout />}>
           {/* The Layout contains the outlet and Every Route below represent the children */}
           <Route path='/dashboard'  element = {<Dashboard />} />
           <Route path='/product'  element = {<Product />} />
           <Route path='/customer'  element = {<ProductOnTable />} />
           

          </Route> 
        {/* Outle route */}
          <Route path="*" element={<NotFound />} />
       </Routes>
         )
         :(
          <PageLoading />
         )
         }

     

  </BrowserRouter>  
     
    </div>
  );
}

export default ClinetApp;
