import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGripLines } from "react-icons/fa";

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
    ]
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
            <div className='  hidden md:flex  gap-4 '>{links.map((items,i) =>(<Link 
            to={items.link}
            className='hover:text-blue-500 transition-all duration-300' key={i}>{items.title}{" "} </Link>
            ))}</div>
            <div className='hidden md:flex gap-4'>
                <Link
                to="/SignIn"
                 className='px-4 py-1  border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignIn</Link>
                <Link 
                to="SignUp"
                className='px-4 py-1 border bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 '>SignUp</Link>
            </div>
            <button className='2xl hover:text-zinc-400' onClick={() => (MobileNav === "hidden" ? setMobileNav("block"): setMobileNav("hidden"))} > <FaGripLines /></button>
        </div>
    </nav>
    <div className={`${MobileNav} z-40 bg-zinc-800 h-screen absolute top-0 left-0 w-full flex flex-col items-center justify-center` }>
    {links.map((items,i) =>(<Link 
            to={items.link}
            className={`${MobileNav} text-white text-4xl font-semibold mb-7 hover:text-blue-500 transition-all duration-300'`} key={i} onClick={() => (MobileNav === "hidden" ? setMobileNav("block"): setMobileNav("hidden"))} >{items.title}{" "}  </Link>))}
             
                <Link
                to="/SignIn"
                 className={`${MobileNav}px-4 py-3 mb-8 text-3xl font-semibold border border-blue-500 rounded hover:bg-white  text-white hover:text-zinc-800 transition-all duration-300 `}>SignIn</Link>
                <Link 
                to="SignUp"
                className={`${MobileNav} px-4 py-3 mb-8 text-3xl font-semibold border bg-blue-500 rounded hover:bg-white text-white hover:text-zinc-800 transition-all duration-300 `}>SignUp</Link>
            
    </div>
    </>
  )
};

export default Navbar