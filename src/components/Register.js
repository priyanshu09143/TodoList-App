import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { APILink } from '../App'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Context } from '../context/Context'
import { Navigate } from 'react-router-dom'

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { Auth, setAuth, Load ,setLoad } = useContext(Context)
  const RegisterHandler = async (e) => {
    e.preventDefault();
    setLoad(true)
    try {
      const { data } = await axios.post(`${APILink}/signIn`, {
        name, email, password
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
      );
      setAuth(true)
      toast.success(data.message);
      setLoad(false)


    } catch (error) {
      toast.error("Something Went Wrong");
      setAuth(false)
      setLoad(false)
    }
  }

  if (Auth) return <Navigate to={"/"} />
  return (
    <>
      <div className="login bg-gray-400 max-w-3xl m-auto text-center leading-10 my-11 rounded-xl">
        <h2 className='text-xl py-4'>Register Here</h2>
        <form onSubmit={RegisterHandler} className='flex flex-col my-4 '>
          <input className='max-w-64 m-auto border-none px-4 my-1 rounded-md' type="name" placeholder='name' name="name" id="name" value={name} onChange={(e) => { setName(e.target.value) }} />
          <input className='max-w-64 m-auto border-none px-4 my-1 rounded-md' type="email" placeholder='Email' name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <input className='max-w-64 m-auto border-none px-4 my-1 rounded-md' type="password" placeholder='password' name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          <button disabled={Load} className='bg-green-300 max-w-40 m-auto px-7 rounded-lg my-1 hover:bg-green-700 transition-all hover:text-white' type='submit'> Register Now</button>
        </form>
        <h3 className='text-xs'>Or</h3>
        <Link to={"/Login"} className='text-blue-700 text-xl hover:text-gray-900 transition-all'>Login have an Account</Link>
      </div>
    </>
  )
}

export default Register