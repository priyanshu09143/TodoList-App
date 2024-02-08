import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context } from '../context/Context'
import toast from 'react-hot-toast'
import { APILink } from '../App'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { Auth, setAuth, Load, setLoad } = useContext(Context)

  const LoginHandler = async (e) => {
    e.preventDefault();
    setLoad(true)
    try {
      const { data } = await axios.post(`${APILink}/logIn`, {
        email, password
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
      );
      setLoad(false)
      setAuth(true)
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      setAuth(false)
      setLoad(false)

    }
  }

  if (Auth) return <Navigate to={"/"} />

  return (
    <>
      <div className="login bg-gray-400 max-w-3xl m-auto text-center leading-10 my-11 rounded-xl">
        <h2 className='text-xl py-4'>LOGIN HERE</h2>
        <form action="" className='flex flex-col my-4 '>
          <input className='max-w-64 m-auto border-none px-4 my-1 rounded-md' type="email" placeholder='Email' name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <input className='max-w-64 m-auto border-none px-4 my-1 rounded-md' type="password" placeholder='password' name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          <button disabled={Load} className='bg-green-300 max-w-40 m-auto px-7 rounded-lg my-1 hover:bg-green-700 transition-all hover:text-white' type='submit' onClick={LoginHandler}> Login Now</button>
        </form>
        <h3 className='text-xs'>Or</h3>
        <Link to={"/Register"} className='text-blue-700 text-xl hover:text-gray-900 transition-all'>I Don't Have an Account</Link>
      </div>
    </>
  )
}

export default Login