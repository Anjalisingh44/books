import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [Profile, setProfile] = useState();
  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://books-1hil.onrender.com/api/users/get-user-information", {
        headers: {
          id: localStorage.getItem("id"),
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };
  
  useEffect(() => {
    fetchUserData();
  }, []);
  

  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-8 text-white'>
  
   {Profile && (
    <>
       <div className=' w-full md:w-1/6  h-auto lg:h-screen'><Sidebar data={Profile} /></div>
       <div className=' w-full md:w-5/6'><Outlet /></div>
    </>

   )}
   
    </div>
  );
}

export default Profile;
