import React, { useEffect } from 'react'
import axios from 'axios';

const AllOrder = () => {
  useEffect(()=> {
    const fetch = async()=>{
    const res =  await axios.get("https://books-1hil.onrender.com/api/users/get-all-orders",{
      headers: {
        id: localStorage.getItem("id"),
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        
      },
    })
    console.log(res.data.data);
    }
    fetch();
  },[]);
  return (
    <div>AllOrder</div>
  )
}

export default AllOrder;