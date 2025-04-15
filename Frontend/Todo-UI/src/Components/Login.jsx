import react from 'react';
import './Login.css'

function Login() {

    return(
        <>
            <div className='login-page'>
            <div className='login-page-container'>
            <h1 style={{letterSpacing: -1.5, lineHeight: 1}}>Login your account</h1>
            <small style={{textAlign: 'center'}}>Enter your detail below to login your acccount</small>
            <div className='login-container'>
                <label htmlFor="username" className='username-label'>Username</label>
                <input type="text" id="username" name="username" placeholder="John"></input>
                {/* <label htmlFor='email' className='email-label'>Email</label>
                <input type="email" className="email" id='email' placeholder='m@example.com'></input> */}
                <label htmlFor='password' className='password-label'>Password</label>
                <input type="password" className="password" id='password' ></input>
                <button type='submit' className='login-btn'> Login </button>
                <small className='login-underline-btn' style={{color: 'black'}}>New to the site? <a href='#' style={{textDecoration: 'underline', color: 'black'}}>Sign up</a>.</small>
            </div>
            </div>
            
            </div>
        </>
    )
}

export default Login;