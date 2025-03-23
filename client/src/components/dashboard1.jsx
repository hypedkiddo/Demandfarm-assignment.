import React,{useState,useEffect} from 'react'
import axios from "axios"

function Dashboard() {
    const[btcPrice,setBtcPrice]=useState({});

    const fetchRate=async()=>{
        try {
            const price=await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur,inr,gbp,cad,jpy"
            )
            console.log(price);
        } catch (error) {
            console.log(error); 
        }
    }

    useEffect(()=>{
        fetchRate();
        const interval=setInterval(fetchRate,10*60*1000);
        return ()=>clearInterval(interval);
    },[])

  return (
    <div>
      Hey Welcome to the app
    </div>
  )
}

export default Dashboard
