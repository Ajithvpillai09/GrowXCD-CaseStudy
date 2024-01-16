import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useState,useEffect } from "react";
import { getCartCount } from "../api/productsApi";



export default function Layout(){

    const [count,setCount] = useState(0)

    useEffect(()=>{
      async function cartCount(){
        try {
            const data = await getCartCount()
            setCount(data._count)
        } catch (error) {
            console.log(error);
        }
        
      }
      cartCount()
    },[])

    return(
        <>
            <Header count={count}/>
            <Outlet/>
        </>
        
    )
}