import React from 'react'
import { Link} from 'react-router-dom'
import { useContext } from "react";
import { Context } from "../context/Context";
import { APILink } from '../App';
import axios from 'axios';
import toast from 'react-hot-toast';

function Header() {
  const { Auth, setAuth } = useContext(Context)
  const LogoutHandler = async () => {
    try {
      await axios.get(`${APILink}/logout`, {
        withCredentials: true
      }
      );
      setAuth(false)
      toast.success("User Logout SuccessFully");
    } catch (error) {
      toast.error("Server Error");
      setAuth(true)
    }
  }

  return (
    <>
      <div className="headerContainer flex bg-stone-400 justify-between p-3 text-xl">

        <h3 className=''>TODO List App</h3>

        <div className="headerButton ">
          <Link className='px-4 py-2 mx-7 transition-all hover:bg-black hover:text-white rounded-lg' to={"/"}>Home</Link>
          <Link className=' px-4 py-2 mx-7 transition-all hover:bg-black hover:text-white rounded-lg' to={"/Profile"}>Profile</Link>

          {
            Auth ? <button className='px-4 py-2 mx-7 transition-all hover:bg-black hover:text-white rounded-lg' onClick={LogoutHandler}>Logout</button> : <Link className=' px-4 py-2 mx-7 transition-all hover:bg-black hover:text-white rounded-lg' to={"/Login"}>Login</Link>
          }
        </div>
      </div>
    </>
  )
}

export default Header