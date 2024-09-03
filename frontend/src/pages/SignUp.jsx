import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: ""
  });
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    try {
      const { username, email, password, address } = Values;

      if (!username || !email || !password || !address) {
        alert("All fields are mandatory");
        return;
      }

      const response = await axios.post("https://books-1hil.onrender.com/api/users/signup", Values);

      if (response.data && response.data.message) {
        alert(response.data.message);
      } else {
        alert("Signed up successfully!");
      }

      navigate('/SignIn');
    } catch (error) {
      console.error("Sign up error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className='bg-zinc-900 min-h-screen flex items-center justify-center'>
      <div className='bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-semibold text-zinc-200 mb-6'>SignUp</h2>
        <form className='space-y-5' onSubmit={submit}>
          <div>
            <label htmlFor="username" className='block text-zinc-200 mb-2'>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className='w-full p-2 border border-gray-300 rounded-lg'
              required
              autoComplete="username"
              value={Values.username}
              onChange={change}
            />
          </div>
          <div>
            <label htmlFor="email" className='block text-zinc-200 mb-2'>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className='w-full p-2 border border-gray-300 rounded-lg'
              required
              autoComplete="email"
              value={Values.email}
              onChange={change}
            />
          </div>
          <div>
            <label htmlFor="password" className='block text-zinc-200 mb-2'>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className='w-full p-2 border border-gray-300 rounded-lg'
              required
              autoComplete="new-password"
              value={Values.password}
              onChange={change}
            />
          </div>
          <div>
            <label htmlFor="address" className='block text-zinc-200 mb-2'>Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              className='w-full p-2 border border-gray-300 rounded-lg mb-6'
              required
              autoComplete="address-line1"
              value={Values.address}
              onChange={change}
            />
          </div>
          <button
            type="submit"
            className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-800 transition'
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
  );
};

export default SignUp;
