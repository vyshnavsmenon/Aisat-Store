import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { database } from './firebase';
import './Profile.css'
import CreateIcon from '@mui/icons-material/Create';
import Navbar from './Navbar';

function Profile() {
  const [data,setData] = useState([]);
  const [cookie, setCookie] = useCookies(["user-id"]);
  const navigate = useNavigate()
  const userid = cookie['user-id'];
  useEffect(() => {
    
    if(!userid){
      navigate('/login');
    }
  }, [cookie,navigate])

  useEffect(() => {
    
    async function fetchData(){
      try{
        const response = await getDoc(doc(database, 'Users', userid));
        if(response.exists()){
          setData(response.data())          
        }
      }
      catch(error){
        console.error("Error while fething data: ", error);
      }
    }

    fetchData();
  }, [])
  return (
    <>
    <Navbar showNavbar={true}/>
    <div className='profile'>
     <div className='small-body'>
      <div className='heading'>
        <div><h2>{data.username} </h2></div>
        <div className='edit-icon'><CreateIcon/></div>
      </div>
      <div><h4>Name : {data.Fullname}</h4></div>
      <div><h4>Email id : {data.Emailid}</h4></div> 
    </div>     
    </div>
    </>
  )
}

export default Profile