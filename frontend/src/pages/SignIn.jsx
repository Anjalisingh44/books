import React from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <div className='bg-zinc-900 min-h-screen flex items-center justify-center'>
      <div className='bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-semibold text-zinc-200 mb-6 '>SignIn</h2>
        <form className='space-y-5'>
         
          <div>
            <label htmlFor="email" className='block text-zinc-200 mb-2'>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className='w-full p-2 border border-gray-300 rounded-lg'
              required
            />
          </div>
          <div>
            <label htmlFor="password" className='block text-zinc-200 mb-2'>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className='w-full p-2 border border-gray-300 rounded-lg mb-4'
              required
            />
          </div>
         
          <button
            type="submit"
            className='w-full  bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-800 transition '
          >
            SignIn
          </button>
        </form>
        <p className='text-center mt-4 text-white'>
          Don't have an account?{' '}
          <Link to="/SignUp" className='text-blue-500 hover:underline'>SignUp</Link>
        </p>
      </div>
    </div>
  
  )
}

export default SignIn