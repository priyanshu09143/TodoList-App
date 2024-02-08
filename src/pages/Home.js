import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context'
import axios from "axios"
import toast from 'react-hot-toast'
import { APILink } from '../App'
function Home() {
  const { Auth } = useContext(Context)

  const [Title, setTitle] = useState("")
  const [Discription, setDiscription] = useState("")
  const [Loading, setLoading] = useState(false)
  const [Tasks, setTasks] = useState([])
  const [Refresh , setRefresh] = useState(false)
  
  const UpdateHandler = async(id)=>{
 try { 
  const { data } = await axios.put(`${APILink}/update/${id}`,{},{
    withCredentials:true
  });
  setRefresh(!Refresh)
      toast.success(data.message)
    } catch (error) {
      toast.error("Task Not Update")
    }
  }
  const DeleteHandler = async(id)=>{
    try {
       const user = await axios.delete(`${APILink}/delete/${id}`,{
        withCredentials:true
      });
          setRefresh(!Refresh)
          toast.success(user.data.message)
        } catch (error) {
          toast.error("Task Not Update")
        }

  }

  const SubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.post(`${APILink}/AddTask`, {
        Title,
        Discription
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })
      toast.success(data.message)
      setTitle("")
      setDiscription("")
      setRefresh(!Refresh)
      setLoading(false)
    } catch (error) {
      toast.error("Tast Add Failed")
      setLoading(false)
    }
  }

 useEffect(() => {
  axios.get(`${APILink}/AllTasks`, {
    withCredentials: true,
  }).then((res) => setTasks(res.data.task))
    .catch((e) => console.log(e))
 }, [Refresh])
 
  return (
    <>
      <div >
        {
          Auth ? <div className="box" >
            <div >
              <form onSubmit={SubmitHandler} className='flex flex-col justify-center items-center mt-11' >
                <input type="text" placeholder='Enter Title' className='bg-gray-200 border-none h-9 w-[35vw] text-gray-900 font-semibold p-4 mb-4' value={Title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder='Enter Discription' className='bg-gray-200 border-none h-9 w-[35vw] text-gray-900 font-semibold p-4 mb-4' value={Discription} onChange={(e) => setDiscription(e.target.value)} />
                <button className='bg-gray-700 text-white px-20 py-1 rounded-sm text-xl font-semibold hover:bg-white hover:text-black transition-all hover:border-black' disabled={Loading}>Add Task </button>
              </form></div>
            <div className="tasks w-[50vw] m-auto h-[50vh] overflow-scroll mt-8 p-4 font-semibold">

              {
                Tasks.map((e) =>
                  <div key={e._id} className='border-gray-600 border-solid border-2 mb-3 rounded-lg py-3 px-9 flex items-center justify-between bg-slate-300'>
                    <input type="checkbox" className='h-5 w-5 ' checked={e.isCompleted} onChange={()=> UpdateHandler(e._id)}/>
                    <div className='mx-9'>
                      <h1>Title - {e.Title}</h1>
                      <p>Discription - {e.Discription}</p>
                    </div>
                    <button onClick={()=> DeleteHandler(e._id)}>Delete</button>
                  </div>
                )
              }
            </div>
          </div>

            : <div className="box flex justify-center items-center h-[70vh]">
              <Link to="/Register" className='text-3xl mx-3 bg-green-300 max-w-40 m-auto p-3 rounded-lg my-1 hover:bg-green-700 transition-all hover:text-white'> Register</Link>
              <Link to="/Login" className='text-3xl mx-2 max-w-40 m-auto p-3 rounded-lg my-1 hover:bg-gray-700 transition-all hover:text-white'> Login</Link>
            </div>
        }
      </div>
    </>
  )
}
export default Home



