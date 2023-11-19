import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext=createContext({})

export function UserContextProvider({children}){
    const [user,setUser]=useState(null);

    useEffect(()=>{
        getUser();
    },[])

    const getUser = async ()=>{
        try{
            const res = await axios.get("http://localhost:8800/api/auth/refetch",{withCredentials:true});
            console.log(res.data);
            setUser(res.data);
        }catch(err){
            console.log(err);
        }
    }
    return (<UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>)
}