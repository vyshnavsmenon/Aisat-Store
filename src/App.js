import React from 'react';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';

function App() {
  return (
    <>      
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>      
    </>
  )
}

export default App