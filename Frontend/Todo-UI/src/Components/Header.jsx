import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className ="header-container">
        {/* <button className='logout-btn'>Logout</button> */}
        <div className="logo-text">Todo - e - List</div>
        {/* <div className='hello-message'>Hi, </div> */}
      </div>
    </header>
  )
}

export default Header
