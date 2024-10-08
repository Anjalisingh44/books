import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch,useSelector } from 'react-redux';
import { authAction } from '../../store/auth';




const Sidebar = ({data}) => {
  const dispatch = useDispatch();
   const navigate = useNavigate();
   const role = useSelector((state) => state.auth.role);
   const isSiggnedIn = useSelector((state) => state.auth.isSiggnedIn); 
  return (
    <div className='bg-zinc-800 p-3 rounded flex flex-col items-center justify-between h-[100%] '>
      <div className='p-7 flex  items-center flex-col justify-center '>{" "}
      <img src="\avatar.png"   className='w-1/3 h-auto md:w-1/3 lg:w-full lg:h-[20vh] invert'/>
      <p className='mt-2 text-xl text-zinc-100 font-semibold '>{data.username}</p>
      <p className='mt-2 text-normal text-zinc-300'>{data.email}</p>
      <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'>  </div>
     {role === "user" &&  (
      
      <div className='w-full flex flex-col items-center justify-center hidden lg:flex '>
        <Link  
        to='/profile/favourites'
        className='text-zinc-100 font-semibold w-full mt-20 text-center hover:bg-zinc-900 rounded transistion-all '
        > Favourites
        </Link>
        <Link  
        to='/profile/orderHistory'
        className='text-zinc-100 font-semibold w-full py-4 text-center hover:bg-zinc-900 rounded transistion-all mt-2'
        > Order History
        </Link>
        <Link  
        to='/profile/settings'
        className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transistion-all mt-1'
        > Settings
        </Link>

      </div>
     
     )}
     {role === "admin" && (
       <div className='w-full flex flex-col items-center justify-center hidden lg:flex '>
       <Link  
       to='/profile/all-order'
       className='text-zinc-100 font-semibold w-full mt-20 text-center hover:bg-zinc-900 rounded transistion-all '
       > All Orders
       </Link>
       <Link  
       to='/profile/add-book'
       className='text-zinc-100 font-semibold w-full py-4 text-center hover:bg-zinc-900 rounded transistion-all mt-2'
       > Add Book
       </Link>
     </div>

     )}
     <button className='bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-20 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transistion-all duration-300 ' onClick={() => {
      dispatch(authAction.logout());
      dispatch(authAction.changeRole("user"));
      localStorage.clear("id");
      localStorage.clear("token")
      localStorage.clear("role");
      navigate("/");
     }}>
    
        Log Out
        <AiOutlineLogout  className='font-semibold ms-4'/>
      </button>
      
      </div>
    </div>
  )

}

export default Sidebar