import React from 'react'
import './Navbar.css';
import {Link, useNavigate} from 'react-router-dom';

function Navbar() {
  return (
    <div className='navbar'>
        <div className='first-portion'>
            <div className='logo'>
                <label>ALBERTIAN INSTITUTE OF SCIENCE AND TECHNOLOGY(AISAT)</label>
            </div>
        </div>
        <div className='last-portion'>
            <ul>
                <li>
                    <Link className='list'>Home</Link>
                </li>
                <li>
                    <Link className='list' to="/login">Login</Link>
                </li>
                <li>
                    <Link className='list'>Sign Up</Link>
                </li>
                <li>
                    <Link className='list'>Profile</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar