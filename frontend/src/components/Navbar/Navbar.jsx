import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const links = [
        {
            title: "Home",
            link:"/",
        },
        
        {
            title: "AllBooks",
            link:"/all-books",
        },
        {
            title: "Cart",
            link:"/cart",
        },
        {
            title: "Profile",
            link:"/profile",
        },
    ];
   const isSiggnedIn = useSelector((state) => state.auth.isSiggnedIn);
if(isSiggnedIn === false){
    links.splice(2,2);
}
    const [MobileNav, setMobileNav] = useState("hidden");

  return (
   
    <>
    <nav className=' z-50 relative  flex bg-zinc-800 text-white px-8 py-4 justify-between'>
        <Link to="/"
        className='flex items-center'> 
            <img className='h-10 me-4' src="\glass.png" alt="logo" />
            <h1 className='text-2xl font-semibold'>BookHeaven</h1>
        </Link>
        <div className=' nav-links-bookheaven block  md:flex items-center gap-4 '>
            <div className='  hidden md:flex  gap-4 '>{links.map((items,i) =>(
                <div className='flex items-center'>
                {items.title === "Profile" ? (
                   <Link 
                   to={items.link}
                   className=' px-4 py-1 border bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 ' key={i}>{items.title}{" "} </Link> 
                ):(
                    <Link 
            to={items.link}
            className='hover:text-blue-500 transition-all duration-300' key={i}>{items.title}{" "} </Link>
                )
            }
                </div>
            ))}</div>
           {isSiggnedIn === false && (
             <div className='hidden md:flex gap-4'>
             <Link
             to="/SignIn"
              className='px-4 py-1  border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignIn</Link>
             <Link 
             to="SignUp"
             className='px-4 py-1 border bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 '>SignUp</Link>
         </div>
           )}
            <button className='2xl hover:text-zinc-400 md:hidden block' onClick={() => (MobileNav === "hidden" ? setMobileNav("block"): setMobileNav("hidden"))} > <FaGripLines /></button>
        </div>
    </nav>
    <div className={`${MobileNav} z-40 bg-zinc-800 h-screen absolute top-0 left-0 w-full flex flex-col items-center justify-center` }>
    {links.map((items,i) =>(
        
        <Link 
            to={items.link}
            className={`${MobileNav} text-white text-4xl font-semibold mb-7 hover:text-blue-500 transition-all duration-300'`} key={i} onClick={() => (MobileNav === "hidden" ? setMobileNav("block"): setMobileNav("hidden"))} >{items.title}{" "}  </Link>))}
             
                {isSiggnedIn === false && (
                    <>
                <Link
                to="/SignIn"
                 className={`${MobileNav} px-4 py-3 mb-8 text-3xl font-semibold border border-blue-500 rounded hover:bg-white  text-white hover:text-zinc-800 transition-all duration-300 `}>SignIn</Link>
                <Link 
                to="SignUp"
                className={`${MobileNav} px-4 py-3 mb-8 text-3xl font-semibold border bg-blue-500 rounded hover:bg-white text-white hover:text-zinc-800 transition-all duration-300 `}>SignUp</Link>
            </>
               ) }
    </div>
    </>
  )
};

export default Navbar