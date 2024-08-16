import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='bg-zinc-900 min-h-screen flex items-center justify-center'>
      <div className='bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-semibold text-zinc-200 mb-6 '>SignUp</h2>
        <form className='space-y-5'>
          <div>
            <label htmlFor="username" className='block text-zinc-200 mb-2'>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className='w-full p-2 border border-gray-300 rounded-lg'
              required
            />
          </div>
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
              className='w-full p-2 border border-gray-300 rounded-lg'
              required
            />
          </div>
          <div>
            <label htmlFor="address" className='block text-zinc-200 mb-2'>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              className='w-full p-2 border border-gray-300 rounded-lg  mb-6'
              required
            />
          </div>
          <button
            type="submit"
            className='w-full  bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-800 transition '
          >
            SignUp
          </button>
        </form>
        <p className='text-center mt-4 text-white'>
          Already have an account?{' '}
          <Link to="/SignIn" className='text-blue-500 hover:underline'>SignIn</Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
