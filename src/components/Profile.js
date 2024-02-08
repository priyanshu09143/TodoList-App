import React, { useContext } from 'react'
import Loader from "../pages/Loader"
import { Context } from '../context/Context'
import { Navigate } from "react-router-dom"

function Profile() {
  const {User,Load,Auth} = useContext(Context)
  if(!Auth) return  <Navigate to={"/"}/>
  return (
    <>
      {
        Load ? <Loader/> :
        <div className='text-center m-7'> <h1 className='text-3xl'>{User?.name}</h1><h1 className='text-2xl'>{User?.email}</h1></div>
      }
     
</>
  )
}

export default Profile