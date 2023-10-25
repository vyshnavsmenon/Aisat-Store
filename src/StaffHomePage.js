import React from 'react'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function StaffHomePage({show}) {
  
  return (
    <div>
      <Navbar showNavbar={false}/>
      <div className='navbar'>
        <div className='navbar'>
            <div className='first-portion'>
                <div className='logo'>                
                    <label>ALBERTIAN INSTITUTE OF SCIENCE AND TECHNOLOGY(AISAT)</label>                
                </div>
            </div>
            <div className='last-portion'>
                <ul>
                    <li>
                        <Link className='list' to="/uploadProducts">Upload Products</Link>
                    </li>
                    <li>
                      <Link className='list' to="/updateStock">Update Stock</Link>
                    </li>
                    <li>
                        <Link className='list' to="/stafflogin">Login</Link>
                    </li>                    
                </ul>
            </div>
        </div>
      </div>
    </div>
  )
}

export default StaffHomePage