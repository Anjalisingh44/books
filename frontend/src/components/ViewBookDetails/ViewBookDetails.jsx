
import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useParams,Link } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import {useSelector} from "react-redux"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
const ViewBookDetails = () => {
  const {id}= useParams();
const navigate = useNavigate();
  const [data, setData] = useState([]);
const isSiggnedIn = useSelector((state)=> state.auth.isSiggnedIn);
const role = useSelector((state) => state.auth.role);



  useEffect(() => {
  const fetch = async () => {
    try {
        const response = await axios.get(`https://books-1hil.onrender.com/api/users/get-book-by-id/${id}`);
        // console.log(response);
        setData(response.data.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
fetch();
}, 
[]);

const handleFavourite = async ()=>{
  try {
    const response = await axios.put("https://books-1hil.onrender.com/api/users/favourite-book", {}, {
      headers: {
        id: localStorage.getItem("id"),
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        bookid: id,
      },
    });
    alert(response.data.message); // Display the response message
  } catch (error) {
    console.error("Error adding to favourites:", error);
    alert("Failed to add the book to favourites.");
  }
};
const handleCart = async () =>{
  const response = await axios.put("https://books-1hil.onrender.com/api/users/add-to-cart",{},{
    headers: {
      id: localStorage.getItem("id"),
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      bookid: id,
    },
  })
  alert(response.data.message);
}
const deletebook = async () => {
   const response = await axios.delete("https://books-1hil.onrender.com/api/users/delete-book",{
    headers: {
      id: localStorage.getItem("id"),
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      bookid: id,
    },
  })
  alert(response.data.message);
  navigate("/all-books");
}
  return (
    <div className=' px-3 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-7'>
        <div className='flex flex-col lg:flex-row bg-zinc-800 rounded p-4 h-[40vh] lg:h-[75vh] w-5/6 lg:w-[45%] flex items-center justify-center gap-6'>{" "}
        <img src={data.url} alt="/" className="  h-[29vh] md:h-[40vh] lg:h-[47vh] rounded " />
      {isSiggnedIn === true && role=="user" && (
        <div className='flex flex-row lg:flex-col gap-6'>
        <button  className='bg-white rounded-full text-3xl p-2 text-red-800 text-2xl'  onClick={handleFavourite}>
      <FaHeart/> 
      </button>
      <button  className='bg-blue-500 rounded-full text-3xl p-2 text-white text-2xl '  onClick={handleCart} >
      <FaShoppingCart/> 
      </button>
      </div>
      )}
        
        {isSiggnedIn === true && role=="admin" && (
        <div className='flex flex-row lg:flex-col gap-6'>
        <Link to={`/updateBook/${id}`} className='bg-white rounded-full text-3xl p-2  text-2xl'   >
        <FaEdit />
      </Link>
      <button  className='bg-white rounded-full text-3xl p-2 text-red-500 text-2xl mt-4 '  onClick={deletebook}>
      <MdDelete />
      </button>
      </div>
      )}
        </div>
       
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