import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {authAction} from "../store/auth";
import {useDispatch} from "react-redux";

const SignIn = () => {
  const [Values, setValues] = useState({
  
    email: "",
    password: "",
    
  });
  const navigate = useNavigate(); 
const dispatch = useDispatch();


  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    try {
      if (
        
        Values.email === "" ||
        Values.password === "" 
        
      ) {
        alert("All fields are mandatory");
      } else {
      
        const response = await  axios.post("http://localhost:1000/api/users/signin",Values);
        // console.log(response.data.token);
      
dispatch(authAction.SignIn());
dispatch(authAction.changeRole( response.data.role));
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('accessToken', response.data.accessToken);

         navigate('/profile')
      }
    } catch (error) {
      // Handling the error response
      if (error.response) {
        // Server responded with a status code other than 2xx
        const statusCode = error.response.status;
        const statusText = error.response.statusText;
        const errorData = error.response.data;
  
        // Check if the error data is HTML and extract useful information
        if (typeof errorData === 'string' && errorData.includes('<pre>Error:')) {
          const errorMessage = errorData.match(/<pre>(.*?)<\/pre>/)[1];
          alert(`Error ${statusCode}: ${statusText}\n${errorMessage}`);
        } else {
          alert(`Error ${statusCode}: ${statusText}`);
        }
      } else if (error.request) {
        // No response received from the server
        alert("No response received from the server.");
      } else {
        // Other errors
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className='bg-zinc-900 min-h-screen flex items-center justify-center '>
      <div className='bg-zinc-800 rounded-lg shadow-lg  p-4 w-full max-w-md'>
        <h2 className='text-2xl font-semibold text-zinc-200 mb-0 p-4 '>SignIn</h2>
        <form className='space-y-6 p-5'>
         
          <div>
            <label htmlFor="email" className='block text-zinc-200 mb-2'>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className='w-full p-2 border border-gray-300 rounded-lg'
              required
              value={Values.email}
              onChange={change}
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
              value={Values.password}
              onChange={change}
            />
          </div>
         
          <button
            
            className='w-full  bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-800 transition '
          onClick={submit}>
            SignIn
          </button>
        </form>
        <p className='text-center m-6 text-white text-xl'>
          Don't have an account?{' '}
          <Link to="/SignUp" className='text-blue-500 hover:underline'>SignUp</Link>
        </p>
      </div>
    </div>
  
  )
}

export default SignIn