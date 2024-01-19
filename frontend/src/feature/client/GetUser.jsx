import { useSelector,useDispatch } from 'react-redux'
import { setPageLoading } from '../../state'

import React,{useEffect} from 'react'

function GetUser() {

  const  {pageLoading,currentUser}  = useSelector((state)=>state.global)//disstructuring
  const dispatch  = useDispatch()
 

  //console.log(useUserProfileQuery())
  useEffect(()=>{
   try {

    if(!currentUser){
     dispatch(setPageLoading(true))/**this will call page loading component that get profile data*/
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

