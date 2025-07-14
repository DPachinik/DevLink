 import { useState, useEffect } from "react";
 import { onAuthStateChanged } from "firebase/auth";
 import { auth } from "../services/firebaseConnection";
import { Navigate } from "react-router-dom";


 export default function Private ({children}){
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(()=>{
     async function checkLogin (){
        const unsub = onAuthStateChanged(auth,(user)=>{
            
            if(user){
                const userData={
                    uid: user.uid,
                    email:user.email
                }

                localStorage.setItem('@userDetails', JSON.stringify(userData));
                setLoading(false);
                setSigned(true)
            }else{
                setLoading(false);
                setSigned(false);
            }
            
        })
        return()=>unsub();
    }
    checkLogin();
  },[])

  if(loading){
    return <div>cargandooo</div>
  }

  if(!signed){
    return <Navigate to ='/login' />
  }

    return children;
 } 