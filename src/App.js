import React from 'react';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Cart from './Cart';
import Favorites from './Favorites';
import Profile from './Profile';
import Logout from './Logout';

function App() {
  return (
    <>      
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Aisat-Store' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='/profile' element={<Profile/>} />
          <Route path='/logout' element={<Logout/>} />
        </Routes>      
    </>
  )
}

export default App