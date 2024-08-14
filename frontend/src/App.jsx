import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import AllBooks from './pages/AllBooks';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
const App = () => {
  return (
    <div>
      <Router> <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route  path='/all-books' element={<AllBooks />}></Route>
        <Route  path='/SignIn' element={<SignIn />}></Route>
        <Route  path='/SignUp' element={<SignUp />}></Route>
        <Route  path='/cart' element={<Cart/>}></Route>
        <Route  path='/profile' element={<Profile />}></Route>
      </Routes>
      <Footer/>
      </Router>
      
   
    
       
    </div>
  )
}

export default App