import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setCurrentUser, setIsLoading,setPageLoading } from '../../state'





function Dashboard() {
 const  {isLoading,pageLoading}  = useSelector((state)=>state.global)
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
    <div>Dashboard Cient</div>
  )
}

export default Dashboard