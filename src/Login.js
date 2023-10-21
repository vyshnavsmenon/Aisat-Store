import React, {useState} from 'react'
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUSerName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    
    function readUsername(e){
      setUSerName(e.target.value);
    }
    function readPassword(e){
      setPassword(e.target.value);
    }
    function handleSignup(){
      navigate('/signup')
    }
  return (
    <div className='background'>         
            <div className='small-body'>
                <h2>Log in</h2>
                <div><input className='input-bar' type='text' placeholder='Username' onChange={readUsername}/></div>
                <div><input className='input-bar' type='password' placeholder='Password' onChange={readPassword}/></div>
                <div><button className='login'>Log in</button></div>
                <div><button className='createAccount' onClick={handleSignup}>Create an account</button></div>
            </div>
        
    </div>
  )
}

export default Login

