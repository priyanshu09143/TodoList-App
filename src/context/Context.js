import {createContext, useState } from 'react'

export const Context = createContext({IsAuth:false})

export const ContextProvider =(props)=>{
    const [Auth,setAuth] = useState(false)
    const [Load,setLoad] = useState(false)
    const [User,setUser] = useState({})
    return(
        <Context.Provider value={{Auth,setAuth ,Load,setLoad,User,setUser}}>
            {props.children}
        </Context.Provider>
    );
}