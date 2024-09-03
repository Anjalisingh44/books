import React, { useState,useEffect } from 'react'
import axios from 'axios';
import Bookcard from '../components/Bookcard/Bookcard';


const AllBooks = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
      const fetch = async () => {
          try {
              const response = await axios.get("https://books-1hil.onrender.com/api/users/get-all-book");
              setData(response.data.data);
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      };
      fetch();
  }, []);
  return (
    <div className='bg-zinc-900 px-12 py-8 h-auto'>
      <h4 className='text-2xl font-semibold text-yellow-100'>All books</h4>
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
        {Data.length > 0 ? (
          Data.map((item, index) => (
            <div  className=" text-white" key={index}>
              <Bookcard data={item} />
            </div>
          ))
        ) : (
          <p className='text-yellow-100'>No books available</p>
        )}
      </div>
    </div>
  );
};

export default AllBooks