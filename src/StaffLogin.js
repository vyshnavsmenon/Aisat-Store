import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { auth, database } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function StaffLogin() {

    const [emailid, setEmailid] = useState();
    const [password, setPassword] = useState();
    const [cookie, setCookie] = useCookies([]);
    const navigate = useNavigate();

    function readEmailid(e){
        setEmailid(e.target.value);
    }
    function readPassword(e){
        setPassword(e.target.value);
    }
    function handleLogin(){
        signInWithEmailAndPassword(auth, emailid, password)
        .then((response) =>{
            const collectionRef = collection(database, 'Users')
            const q = query(collectionRef, where('Email id', '==', emailid))

            getDocs(q)
            .then((querySnapshot) => {
              if(!querySnapshot.empty){
                const docSnapshot = querySnapshot.docs[0];
                const docId = docSnapshot.id;
                setCookie("user-id", docId, {path : "/"});
                navigate('/updateStock');                
              }
              else{
                toast.error("User not found");
              }
              
            })
            .catch((error) => {
              toast.error(error.message);
            })
            toast.success("Successfully logged in!");
        })
        .catch((Error) => {
            toast.error(Error.message);
          })  
    }
  return (
    <div>
        { <ToastContainer/> }
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
      
      <div className='background'> 
        <div className='small-body'>
        <h2>Log in</h2>
            <div><input className='input-bar' type='text' placeholder='Email id' onChange={readEmailid}/></div>
            <div><input className='input-bar' type='password' placeholder='Password' onChange={readPassword}/></div>
            <div><button onClick={handleLogin} className='login'>Log in</button></div>            
        </div>
      </div>

    </div>
  )
}

export default StaffLogin