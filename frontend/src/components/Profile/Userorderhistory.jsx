import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Userorderhistory = () => {
  const [orderHistory, setorderHistory] = useState([]);
  useEffect(()=> {
    const fetch = async()=>{
    const res =  await axios.get("https://books-1hil.onrender.com/api/users/get-order-history",{
      headers: {
        id: localStorage.getItem("id"),
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        
      },
    })
    setorderHistory(res.data.data);
    }
    fetch();
  },[]);
  return (
  <>
   {orderHistory.length === 0 ? (
        <div className='h-[80vh] p-4 text-zinc-100'>
          <div className='h-[100%] flex flex-col items-center justify-center'>
            <h2 className='text-5xl font-semibold text-zinc-500 mb-8'>No order history</h2>
            <img src="/noorder.jpg" alt="No order" className='h-[20vh] mb-8'/>
          </div>
        </div>
      ) : (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-2xl md:text-3xl font-semibold text-zinc-500 mb-8'>
            Your Order History
          </h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4'>
            {/* Table Header */}
            <div className='flex gap-2'>
              <div className='w-1/12'>
                <h1 className=''>Sr.</h1>
              </div>
              <div className='w-3/12'>
                <h1>Books</h1>
              </div>
              <div className='w-[45%]'>
                <h1>Description</h1>
              </div>
              <div className='w-[9%]'>
                <h1>Price</h1>
              </div>
              <div className='w-[17%]'>
                <h1>Status</h1>
              </div>
              <div className='w-0.5/12'>
                <h1>Mode</h1>
              </div>
            </div>
            {/* Table Content */}
            {orderHistory.map((items, i) => (
              <div key={i} className='bg-zinc-800 w-full rounded py-2 px-1 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer'>
                <div className='w-[4.5%]'>
                  <p className=''>{i + 1}</p>
                </div>
                <div className='w-[22%]'>
                {items.book ? (
    <Link to={`/view-book-details/${items.book._id}`}>
      {items.book.title}
    </Link>
  ) : (
    <p>Book not available</p>
  )}
</div>
                
                <div className='w-[45%]'>
                {items.book ? (
    <p>{items.book.desc.slice(0, 30)}....</p>
  ) : (
    <p>Description not available</p>
  )}
</div>
                <div className='w-[9%]'>
                {items.book ? (
    <p>Rs {items.book.price}</p>
  ) : (
    <p>Price not available</p>
  )}
</div>
                <div className='w-[16%]'>
                <h1 className='font-semibold text-green-500'>
                  {items.status === "Order placed" ? (
                    <div className='text-yellow-500'> {items.status}</div>
                  ): items.status === "Canceled" ? (
                    <div className='text-red-500'>{items.status}</div>
                  ):(
                    items.status
                  )}

                </h1>
                
                </div>
                <div className='w-0.5/12'>
                  <p>COD</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Userorderhistory;