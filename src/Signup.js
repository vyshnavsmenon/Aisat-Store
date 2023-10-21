import React, { useState } from 'react'
import {useCookies} from 'react-cookie'
import {auth, database} from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';


function Signup() {

  const [fullname, setFullName] = useState("");
  const [emailid, setEmailid] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();
  const [cookie, setCookie] = useCookies([])
  const navigate = useNavigate();
  const docRef = useState()

  function handleFullname(e){
    setFullName(e.target.value);  
  }
  function handleEmailid(e){
    setEmailid(e.target.value);
  }
  function handleUsername(e){
    setUsername(e.target.value);
  }
  function handlePassword(e){
    setPassword(e.target.value);
  }

  async function handleSignup() {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, emailid, password);
      console.log('User signed up:', userCredential.user);

      const docRef = await addDoc(collection(database, 'Users'), {
        Fullname: fullname,
        username: username,
        Emailid: emailid,
      });

      const userid = docRef.id;
      await updateDoc(doc(database, 'Users', userid), {
        id: userid,
      });

      // Setting a cookie
      setCookie('user-id', userid, { path: '/' });
      navigate('/'); // Redirect to another route upon successful signup
    } catch (error) {
      console.error('Error in signup:', error.message);
    }
  }
  return (
    <div className='background'>
      <div className='small-body'>
        <h2>Sign Up</h2>
        <div><input onChange={handleFullname} className='input-bar' type='text' placeholder='Full Name'/></div>
        <div><input onChange={handleEmailid} className='input-bar' type='text' placeholder='Email id'/></div>
        <div><input onChange={handleUsername} className='input-bar' type='text' placeholder='Username'/></div>
        <div><input onChange={handlePassword} className='input-bar' type='text' placeholder='Password'/></div>
        <div><button onClick={handleSignup} className='login'>Create account</button></div>
      </div>
    </div>
  )
}

export default Signup