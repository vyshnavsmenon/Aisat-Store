import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import Navbar from './Navbar';


function StaffOrStudentLogin() {
    const navigate = useNavigate();
    
    function redirectToStaff(){
        navigate('/stafflogin');
    }
    function redirectToStudent(){
        navigate('/login');
    }

  return (
    <>
    <Navbar showNavbar={false}/>
    <div className='background'>        
        <div className='small-body'>
            <h1>Who are you?</h1>
            <button className='user' onClick={redirectToStaff}>Staff</button>
            <button className='user' onClick={redirectToStudent}>Student</button>
        </div>
    </div>
    </>
  )
}

export default StaffOrStudentLogin