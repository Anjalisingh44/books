import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
const Bookcard = ({data, favourite}) => {
const  handleRemoveBook = async ()=>{
  const response = await axios.put("http://localhost:1000/api/users/remove-book-from-favourite",{},{
    headers: {
      id: localStorage.getItem("id"),
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      bookid: data._id
    }, 
  })
  alert(response.data.message);
}
  
  return (
  <div className='bg-zinc-800 rounded p-4 flex flex-col'>
  <Link to={`/view-book-details/${data._id}`} >
  <div ><div className='bg-zinc-900 rounded flex items-center justify-center'><img src={data.url} alt="/" className=" md:w-65 md:h-40 w-full h-full object-cover" /></div>
  <h2 className='mt-4 text-xl font-semibold'>{data.title}</h2>
  <p className='mt-2 text-zinc-400 font-semibold'>{data.author}</p>
  <p className='mt-2 text-zinc-400 font-semibold'> Rs {data.price}</p>
  <p className='mt-2 text-zinc-400 font-semibold'>{data.language}</p>
  
  </div>
  </Link>
  {favourite && (
  <button className='bg-yellow-100 px-4 py-2 rounded mt-3 text-black border border-yellow-500 ' onClick={handleRemoveBook} >Remove from favourite</button>
  )}
  </div>
);
}

export default Bookcard