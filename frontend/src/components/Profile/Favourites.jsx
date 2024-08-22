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
    setFavouriteBooks(response.data);
  }
   fetch(); 

  }, [])
  
  return (
    <div>
    {FavouriteBooks.length > 0 ? (
      FavouriteBooks.map((items, i) => (
        <div key={i}>
          <Bookcard data={items} />
        </div>
      ))
    ) : (
      <p>No favourite books available.</p>
    )}
  </div>
  )
}

export default Favourites