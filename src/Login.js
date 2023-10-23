import React, {useEffect, useState} from 'react'
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, database } from './firebase';
import { QuerySnapshot, collection, getDocs, query, where } from 'firebase/firestore';
import { useCookies } from 'react-cookie';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [emailid, setEmailid] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const [cookie, setCookie] = useCookies([]);
  
    function readUsername(e){      
      setEmailid(e.target.value);
    }
    function readPassword(e){
      setPassword(e.target.value);
    }
    function handleSignup(){
      navigate('/signup')
    }

    async function handleLogin(){
      signInWithEmailAndPassword(auth, emailid, password)
        .then((response) => {
          console.log(response);
          const collectionRef = collection(database, 'Users')
          const q = query(collectionRef, where('Emailid', '==', emailid))

          getDocs(q)
            .then((querySnapshot) => {
              if(!querySnapshot.empty){
                const docSnapshot = querySnapshot.docs[0];
                const docId = docSnapshot.id;
                setCookie("user-id", docId, {path : "/"});
                navigate('/');
              }
              else{
                console.log("Error logging in");
              }
            })
            .catch((error) => {
              console.error("Error in loggin in: ",error);
            })
        })
        .catch((Error) => {
          console.error("Error in loggin in: ", Error);
        })
    }
  return (
    <div className='background'>         
            <div className='small-body'>
                <h2>Log in</h2>
                <div><input className='input-bar' type='text' placeholder='Email id' onChange={readUsername}/></div>
                <div><input className='input-bar' type='password' placeholder='Password' onChange={readPassword}/></div>
                <div><button onClick={handleLogin} className='login'>Log in</button></div>
                <div><button className='createAccount' onClick={handleSignup}>Create an account</button></div>
            </div>
        
    </div>
  )
}

export default Login

