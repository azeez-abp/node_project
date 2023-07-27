import { useSelector,useDispatch } from 'react-redux'
import { setPageLoading } from '../../state'

import React,{useEffect} from 'react'

function GetUser() {

  const  {pageLoading}  = useSelector((state)=>state.global)
  const dispatch  = useDispatch()
 
  const {currentUser}  = useSelector((state)=>state.global)
  //console.log(useUserProfileQuery())
  useEffect(()=>{
   try {
    if(!currentUser){
     dispatch(setPageLoading(true))
    }
   } catch (error) {
     console.log(error)
   }
 
 
 
  },[pageLoading])
  return (
   <></>
  )
}

export default GetUser

