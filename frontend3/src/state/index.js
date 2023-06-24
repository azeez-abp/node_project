 import { createSlice } from "@reduxjs/toolkit";

 const initialState = {
    mode:"dark"
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
    }
}  
 })



 export const {setMode} = globalColorSlice.actions
 export default globalColorSlice.reducer

 /*
 sfc scannow
 */