import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import './Logout.css'
import Navbar from './Navbar';

function Logout() {
    const [cookie, setCookie, removeCookie] = useCookies(["user-id"]);
    const navigate = useNavigate();

    useEffect(() => {
        const userid = cookie['user-id'];
        if(!userid){
            navigate('/login');
        }
    }, [cookie,navigate])

    function goToHomePage(){
        navigate('/');
    }
    function handleLogout(){
        removeCookie('user-id', {path: '/'});
        navigate('/login');
    }
  return (
    <>
        <Navbar showNavbar={true}/>
        <div className='logout'>
        <div className='small'>
            <label>Do you want to Logout?</label>
            <div className='control-btns'>
                <button onClick={handleLogout} className='logout-btns'>Yes</button>
                <button onClick={goToHomePage} className='logout-btns'>No</button>
            </div>
        </div>
        </div>
    </>
  )
}

export default Logout