import React from 'react'
import { Link } from 'react-router-dom';
const Bookcard = ({data}) => {
  
  return (
  <>
  <Link to={`/view-book-details/${data._id}`} >
  <div className='bg-zinc-800 rounded p-4'><div className='bg-zinc-900 rounded flex items-center justify-center'><img src={data.url} alt="/" className=" md:w-65 md:h-40 w-full h-full object-cover" /></div>
  <h2 className='mt-4 text-xl font-semibold'>{data.title}</h2>
  <p className='mt-2 text-zinc-400 font-semibold'>{data.author}</p>
  <p className='mt-2 text-zinc-400 font-semibold'> Rs {data.price}</p>
  <p className='mt-2 text-zinc-400 font-semibold'>{data.language}</p>
  </div>
  </Link>
  </>
  );
}

export default Bookcard