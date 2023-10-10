import React from 'react';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';

function App() {
  return (
    <>      
      <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>      
    </>
  )
}

export default App