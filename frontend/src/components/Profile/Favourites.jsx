import React from 'react'
import { useEffect,useState } from 'react'
import Bookcard from '../Bookcard/Bookcard';
import axios from 'axios';
const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);
  useEffect(() => {
  const fetch = async () =>{
    const response = await axios.get("http://localhost:1000/api/users/get-book-from-favourite",{
      headers: {
        id: localStorage.getItem("id"),
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        
      },
    })
    setFavouriteBooks(response.data.data);
  }
   fetch(); 

  }, [FavouriteBooks])
  
  return (
    <div className='grid grid-cols-4  gap-4'>
    {FavouriteBooks.length > 0 ? (
      FavouriteBooks.map((items, i) => (
        <div  key={i}>
          <Bookcard data={items} favourite={true} />
        </div>
      ))
      
    )
    : (
      <p className='text-5xl font-semibold text-zinc-500 flex items-center justify-center w-full  '>No favourite books available.</p>
    )}
  </div>
  )
}

export default Favourites