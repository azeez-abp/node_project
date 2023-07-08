import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setIsLoading } from '../../state'
import { useUserProfileQuery } from '../../state/api'



function Dashboard() {
 const  {isLoading}  = useSelector((state)=>state.global)
 const dispatch  = useDispatch()
 const {data:user,isError,isSuccess}  = useUserProfileQuery()
 useEffect(()=>{
  
  try {
  console.log(user)
  } catch (error) {
    console.log(error)
  }
  console.log()

  dispatch(setIsLoading(true))
  console.log(isLoading)
 },[isLoading])

  return (
    <div>Dashboard Cient</div>
  )
}

export default Dashboard