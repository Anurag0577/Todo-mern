import React from 'react';
import './Login.css';
import {useState} from 'react'

function Login() {
  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')



  function fetchData(){
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then((response)=> {
      if(!response.ok){
        throw new Error("Network response is not ok.");
      }
      return response.json();
   } )
   .then((data) => {
    let token = JSON.stringify(data);
    console.log(token);
    localStorage.setItem('Token', token)
   })
   .catch((error) => console.log(error))
  }

  return (
    <>
      <div className="login-page">
        <header className="header">
          <h1 className="logo-text">TODO APP</h1>
        </header>
        <div className="login-form">
          <div className="login-form-container">
            <h1 style={{ letterSpacing: -1.5, lineHeight: 1 }}>Login your account</h1>
            <small style={{ textAlign: 'center' }}>
              Enter your details below to login your account
            </small>
            <div className="login-container">
              <label htmlFor="username" className="username-label">Username</label>
              <input type="text" id="username" className="username" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder="John" />
              <label htmlFor="password" className="password-label">Password</label>
              <input type="password" className="password" value={password} onChange={(e) => setPassword(e.target.value)}  id="password" />
              <button type="button" className="login-btn"onClick={fetchData} >Login</button>
              <small className="login-underline-btn" style={{ color: 'black' }}>
                New to the site?{' '}
                <a href="#" style={{ textDecoration: 'underline', color: 'black' }}>
                  Sign up
                </a>.
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;