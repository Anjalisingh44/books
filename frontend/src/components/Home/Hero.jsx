import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='h-[73vh] flex flex-col md:flex-row item-center justify-center'>
        <div className='flex w-full lg:w-3/6 flex-col items-center lg:items-start justify-center '>
        <h1 className='text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left mt-4'>
            Discover your Next,<br></br> Great Read</h1>
        <p className=' text-xl  text-zinc-300 text-center lg:text-left mt-8 '>
            Uncover captivating stories, enriching knowledge, <br></br> and endless inspiration in our curated collection of books</p>
        <div className='mt-8'><Link to="/all-books" className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full mt-6  '>Discover Book</Link></div>
   </div>
        <div className=' w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center '>
        <img src="public\book.png" alt="book" style={{ width: '65%', height: 'auto', margin:'85px' }}/>
        </div>
        </div>
  );
};

export default Hero