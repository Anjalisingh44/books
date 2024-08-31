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
import Favourites from './components/Profile/Favourites';
import Userorderhistory from './components/Profile/Userorderhistory';
import Settings from './components/Profile/Settings';
import AllOrder from './pages/AllOrder';
import AddBook from './pages/AddBook';
import UpdateBook from './pages/UpdateBook';
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
  },[dispatch])
  
  const ProfileComponent = role === "user" ? Favourites : role === "admin" ? AllOrder : null;
  return (
    <div>
       <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route  path='/all-books' element={<AllBooks />} />
        <Route  path='/SignIn' element={<SignIn />} />
        <Route  path='/SignUp' element={<SignUp />}  />
        <Route  path='/cart' element={<Cart/>} />
        
        <Route  path='/profile' element={<Profile />}>
        
        <Route path='/profile' element={<ProfileComponent />} />
        {role === "admin" && 
        <>
           <Route  path='/profile/add-book' element={<AddBook/>} />
        
           </>
        }

        <Route path="/profile/orderHistory" element={< Userorderhistory/>} />
        <Route path="/profile/settings" element={< Settings/>} />
        </Route>
        <Route path="view-book-details/:id" element= {<ViewBookDetails />} />
        <Route  path='/updateBook/:id' element={<UpdateBook/>} />
      </Routes>
      <Footer/>  
    </div>
  )
}

export default App