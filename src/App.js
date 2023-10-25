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
import Main from './Main';
import StaffHomePage from './StaffHomePage';
import UploadProducts from './UploadProducts';
import UpdateStock from './UpdateStock';
import StaffLogin from './StaffLogin';

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
          <Route path='/home' element={<Main/>}/>
          <Route path='/staffHomePage' element={<StaffHomePage/>}/>
          <Route path='/uploadProducts' element={<UploadProducts/>}/>
          <Route path='/updateStock' element={<UpdateStock/>} />
          <Route path='/stafflogin' element={<StaffLogin/>} />
        </Routes>      
    </>
  )
}

export default App