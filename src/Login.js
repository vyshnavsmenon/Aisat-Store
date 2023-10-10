import React, {useState} from 'react'
import './Login.css';

function Login() {
    const [isLoading, setIsLoading] = useState(false);
  return (
    <div className='background'>         
            <div className='small-body'>
                <h2>Log in</h2>
                <div className='input-bar'><input type='text' placeholder='Username'/></div>
                <div className='input-bar'><input type='password' placeholder='Password'/></div>
            </div>
        
    </div>
  )
}

export default Login

