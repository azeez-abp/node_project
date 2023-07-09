import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setIsLoading,setPageLoading } from '../../state'
import { useUserProfileQuery } from '../../state/api'



function Dashboard() {
 const  {isLoading,pageLoading}  = useSelector((state)=>state.global)
 const dispatch  = useDispatch()
 const {data:user,isError,isSuccess}  = useUserProfileQuery()
 console.log(useUserProfileQuery())
 useEffect(()=>{
  
  try {
  console.log(user,"erty")
  } catch (error) {
    console.log(error)
  }
  console.log()

  //dispatch(setPageLoading(true))
  console.log(isLoading)
 },[pageLoading])

  return (
    <div>Dashboard Cient</div>
  )
}

export default Dashboard