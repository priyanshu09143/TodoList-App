import {  Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from './components/Register'
import Profile from "./components/Profile";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { Context } from "./context/Context";
import axios from "axios"
export const APILink = "https://todoapp-back-1272.onrender.com";

function App() {

  const {setUser,setAuth,setLoad} = useContext(Context)
  
  useEffect(() => {
    setLoad(true)
    axios.get(`${APILink}/profile`,{
            withCredentials:true}).then((res)=> { 
            setUser(res.data.user)
            setAuth(res.data.user)
            setLoad(false)
        } )
        .catch(error=>{
            setUser({})
            setAuth(false)
            setLoad(false)
        })}
        // eslint-disable-next-line
   ,[])
return(
    <Router>
        <Header/>
       <Routes>
           <Route path="/" element ={<Home/>}/>
           <Route path ="/Login" element ={<Login/>}></Route>
           <Route path ="/Profile" element ={<Profile/>}></Route>
           <Route path ="/Register" element ={<Register/>}></Route>

           </Routes>
           <Toaster/>
    </Router>
)
}

export default App;
