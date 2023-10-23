import React, { useState, useEffect, useRef } from 'react'
import './Navbar.css';
import {Link, useNavigate} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleSidebar(){
        setIsOpen(!isOpen)
    }
    const sidebarRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if(!sidebarRef.current.contains(e.target)){
                if(isOpen){
                    setIsOpen(false);
                }
            }
        }

        document.addEventListener("mousedown", handler);

    return () => {
        // Cleanup the event listener when component is unmounted
        document.removeEventListener("mousedown", handler);
    };
}, [isOpen]);
  return (
    <>
        <div className='navbar'>
            <div className='first-portion'>
                <div className='logo'>                
                    <label>ALBERTIAN INSTITUTE OF SCIENCE AND TECHNOLOGY(AISAT)</label>                
                </div>
            </div>
            <div className='last-portion'>
                <ul>
                    <li>
                        <Link className='list' to="/">Home</Link>
                    </li>
                    <li>
                        <Link className='list' to="/login">Login</Link>
                    </li>
                    <li>
                        <Link className='list' to="/signup">Sign Up</Link>
                    </li>
                    <li>
                        <Link className='list' to="/profile">Profile</Link>
                    </li>
                    <li>
                        <div className="menu" onClick={toggleSidebar}>{isOpen ? <CloseIcon/> : <MenuIcon/> }</div>
                    </li>               
                </ul>
            </div>
        </div>
        <div className={`menubar ${isOpen ? 'open' : ''}`} ref={sidebarRef}>
            <ul className='unordered-list'>
                <li>
                    <Link className='list' to="/cart">
                    <div className='items1'>
                        <ShoppingCartIcon/>
                        Your Cart
                    </div>
                    </Link>
                </li>
                <li>
                    <Link className='list' to="/favorites">
                    <div className='items1'>
                        <StarIcon/>
                        Favorites
                    </div>
                    </Link>
                </li>
                <li>
                    <Link className='list' to="/logout">
                    <div className='items1'>
                        <LogoutIcon/>
                        Log out
                    </div>
                    </Link>
                </li>
            </ul>
      </div>
    </>
  )
}

export default Navbar