import React, { useState } from 'react';

import './Signup.css'
import { useNavigate } from 'react-router-dom';


function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function fetchingData(){
            fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username ,
                    email ,
                    password
                })
            })
            .then((response) => {
                if(!response.ok){
                    throw new Error('Network response was not ok.')
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                let token = JSON.stringify(data);
                localStorage.setItem('Token', token);
            })
             .catch((err) => console.log(err))
    }

    return <>
    <div className='signup-page'>
        <header className="header">
          <h1 className="logo-text">TODO APP</h1>
        </header>
        <div className='signup-form'>
            <div className='signup-form-container'>
            <h1 style={{letterSpacing: -1.5, lineHeight: 1}}>Create an account</h1>
            <small style={{textAlign: 'center'}}>Enter your detail below to create your acccount</small>
            <div className='signup-container'>
                <label htmlFor="username" className='username-label'>Username</label>
                <input type="text" id="username" name="username" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder="John"></input>
                <label htmlFor='email' className='email-label'>Email</label>
                <input type="email" className="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='m@example.com'></input>
                <label htmlFor='password' className='password-label'>Password</label>
                <input type="password" className="password" id='password' value={password} onChange={(e)=> setPassword(e.target.value)} ></input>
                <button type='button' className='signup-btn' onClick={() => fetchingData()}> Create an Account </button>
                <small className='login-underline-btn' style={{color: '#666'}}>Already have account? <a href='#' style={{textDecoration: 'underline', color: '#666'}} onClick={() => navigate('/login') }>Login</a></small>
            </div>
            </div>
        </div>
    </div>
        
    </>
}

export default Signup