import React from 'react'; 
import './Signup.css'


function Signup() {

    return <>
        <div className='signup-page'>
            <h1>Create an account</h1>
            <small>Enter your detail below to create your acccount</small>
            <div className='signup-container'>
                <label htmlFor="username" className='username-label'>Username</label>
                <input type="text" id="username" name="username" placeholder="John"></input>
                <label htmlFor='email' className='email-label'>Email</label>
                <input type="email" className="email" id='email' placeholder='m@example.com'></input>
                <label htmlFor='password' className='password-label'>Password</label>
                <input type="password" className="password" id='password' ></input>
                <button type='submit' className='signup-btn'> Create an Account </button>
                <small className='login-underline-btn' style={{color: 'black'}}>Already have account? <a href='#' style={{textDecoration: 'underline', color: 'black'}}>Login</a>.</small>
            </div>
            </div>
    </>
}

export default Signup