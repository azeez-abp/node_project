 import { createSlice } from "@reduxjs/toolkit";

//let out= crypto.decode(login.data.accessToken,   process.env.REACT_APP_ACCESS_TOKEN,JSON.parse(atob('WzMsNCwyLDAsMV0='))     )
 const initialState = {
    mode:"dark",
    isLoading: false,
    pageLoading:true,
    error: null,
    hasLogin:false,
    is404:false,
    webToken:null,
 } 

 /*
 createSlice return both action and reduce 
 console.dir(createSlice)
 */

// return actin and  reducer
 export const globalColorSlice  = createSlice({
    name:'global-color-slice',
    initialState,
    reducers :{///set of function that update initial state, createSlice.action
       setMode : (initialState)=>{
        initialState.mode=initialState.mode==='light'?'dark':'light'
    },
    setIs404 : (state,action)=>{
      state.is404  = action.payload
    },
    setIsLoading: (state,action)=>{
       
         state.isLoading  = action.payload
    },
    setPageLoading: (state,action)=>{
       
      state.pageLoading  = action.payload
 },
    setWebToken: (state,action)=>{
     
      state.webToken  = action.payload
 },
    registrationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registrationSuccess: (state) => {
      state.loading = false;
    },
    registrationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setHasLogin:(value)=>{
      console.log(value)
    }
}  
 })



 export const {
   setMode,
   setIs404,
   setIsLoading,
   setPageLoading,
   setWebToken,
   registrationStart,
   registrationSuccess,
   registrationFailure,


} = globalColorSlice.actions   /// = useDispatch(); is use to call each of the function in globalColorSlice.actions 
 export default globalColorSlice.reducer  
////useSelector to get the value of state key
 /*
 sfc scannow
 */