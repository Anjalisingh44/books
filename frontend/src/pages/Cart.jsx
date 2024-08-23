import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [Cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/users/get-from-cart", {
          headers: {
            id: localStorage.getItem("id"),
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
         // Ensure the structure is correct
        setCart(res.data.data); // Set cart data or default to an empty array
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetch();
  }, [Cart]);

  const deleteItem = async (bookid) => {
    const res = await axios.put(`http://localhost:1000/api/users/remove-from-cart/${bookid}`,{}, {
      headers: {
        id: localStorage.getItem("id"),
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    alert(res.data.message);
  };
  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.forEach((item) => {
        total += item.price; // Use 'item' instead of 'items'
      });
      setTotal(total);
    }
  }, [Cart]);
  const Placeorder = async()=> {
    try {
      const res = await axios.post(
        "http://localhost:1000/api/users/place-order", 
        { order: Cart },
        {
          headers: {
            id: localStorage.getItem("id"),
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      alert(res.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className='bg-zinc-900 px-12 h-screen py-8'>
      {Cart.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
              Empty Cart
            </h1>
            <img src="
            /nocart.png" alt="Empty Cart" />
          </div>
        </div>
      )}

      {Cart.length > 0 && (
        <>
          <h1 className='text-3xl font-semibold text-zinc-500 mb-8 m-3 '>Your Cart</h1>
          {Cart.map((items, i) => (
            <div className='w-full my-5 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center' key={i}>
              <img src={items.url} alt={items.title} className='h-[20vh] md:h-[10vh] object cover' />
              <div className='w-full md:w-auto px-3 '>
                <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>{items.title}</h1>
                <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden'>{items.desc.slice(0, 100)}.......</p>
                <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>{items.desc.slice(0, 65)}.......</p>
                <p className='text-normal text-zinc-300 mt-2 block md:hidden'>{items.desc.slice(0, 100)}...</p>
              </div>
              <div className='flex mt-4  w-full md:w-auto items-center justify-between'>
                <h2 className='text-2xl text-zinc-200 font-semibold flex'>Rs {items.price}</h2>
                <button className='bg-red-100 text-red-600 border-red-600 rounded p-2 ms-12' onClick={() => deleteItem(items._id)}>
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {Cart && Cart.length >0 && (
        <div className='mt-4  w-full flex items-center justify-end'>
          <div className='p-4 bg-zinc-800 rounded'>
            <h1 className='text-2xl text-zinc-100 font-semibold'>
Total Amount
            </h1>
            <div className='mt-3  flex items-center justify-between text-xl text-zinc-100'>
              <h2>
{Cart.length} books
              </h2><h2>{total}</h2>
            </div>
            <div className='w-[100%] mt-3'> 
              <button className='bg-zinc-100 rounded px-4 py-2 flex justift-center w-full font-semibold hover:bg-zinc-500 transistion-300s' onClick={Placeorder}>
Place your oder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
