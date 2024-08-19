import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Routes,Route} from "react-router-dom";
import AllBooks from './pages/AllBooks';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from './store/auth';
const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state)=> state.auth.role);
  useEffect(() =>{
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("accessToken") && 
      localStorage.getItem("role")
    ){
      dispatch(authAction.SignIn());
      dispatch(authAction.changeRole(localStorage.getItem("role")));
    }
  })
  return (
    <div>
       <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route  path='/all-books' element={<AllBooks />}></Route>
        <Route  path='/SignIn' element={<SignIn />}></Route>
        <Route  path='/SignUp' element={<SignUp />}></Route>
        <Route  path='/cart' element={<Cart/>}></Route>
        <Route  path='/profile' element={<Profile />}></Route>
        <Route path="view-book-details/:id" element= {<ViewBookDetails />} />
      </Routes>
      <Footer/>
      
      
   
    
       
    </div>
  )
}

export default App