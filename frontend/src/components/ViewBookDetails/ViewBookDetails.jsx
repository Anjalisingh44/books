
import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr";

const ViewBookDetails = () => {
  const {id}= useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
  const fetch = async () => {
    try {
        const response = await axios.get(`http://localhost:1000/api/users/get-book-by-id/${id}`);
        console.log(response);
        setData(response.data.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
fetch();
}, 
[]);

  return (
    <div className=' px-3 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-7'>
        <div className=' bg-zinc-800 rounded p-4 h-[50vh] lg:h-[88vh] w-full lg:w-3/6 flex items-center justify-center'>{" "}
        <img src={data.url} alt="/" className=" h-[40vh] lg:h-[75vh] " /></div>
        <div className='p-4  w-3/6'>
        <h2 className='mt-4 text-4xl text-zinc-100 font-semibold'>{data.title}</h2>
  <p className='mt-4 text-xl text-zinc-400 font-semibold'>{data.author}</p>
  <p className='mt-4 text-xl text-zinc-400 font-semibold'>{data.desc}</p>

 
  <p className='mt-4 text-zinc-300 font-semibold flex  items-center justify-start'> <GrLanguage className='me-2'/>{data.language}</p>
  <p className='mt-4 text-zinc-100 text-3xl font-semibold'> Rs {data.price} {" "}</p>

        </div>
    </div>
  )
}

export default ViewBookDetails