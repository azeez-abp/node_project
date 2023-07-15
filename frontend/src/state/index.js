 import { createSlice } from "@reduxjs/toolkit";

//let out= crypto.decode(login.data.accessToken,   process.env.REACT_APP_ACCESS_TOKEN,JSON.parse(atob('WzMsNCwyLDAsMV0='))     )
 const initialState = {
    mode:"dark",
    isLoading: false,
    pageLoading:false,
    error: null,
    hasLogin:false,
    is404:false,
    webToken:null,
    currentUser:null,
    errorMessage:'',
    dialogue: {
      open :false,
      close:true,
      callback:false, ///no funnction to call
      text :"Are you sure to proceed"
    }
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
    setCurrentUser: (state,action)=>{
      
    state.currentUser  = action.payload
  },

  setErrorMessage: (state,action)=>{
      
    state.errorMessage = action.payload
  },

  setDialogue:(state,action)=>{
     // console.log(action.payload)
     state.dialogue  = action.payload
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
      
    }
}  
 })



 export const {
   setMode,
   setIs404,
   setIsLoading,
   setPageLoading,
   setWebToken,
   setCurrentUser,
   setDialogue,
   registrationStart,
   registrationSuccess,
   registrationFailure,


} = globalColorSlice.actions   /// = useDispatch(); is use to call each of the function in globalColorSlice.actions 
 export default globalColorSlice.reducer  
////useSelector to get the value of state key
 /*
 sfc scannow
 */