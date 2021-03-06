import React from 'react'
import whiteLogo from '../images/tinder_logo_white.png';
import colorLogo from '../images/color-logo-tinder.png';

function Nav({ minimal, setShowModal, showModal, setIsSignUp, authToken }) {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  }
  return (
    <nav>
      <div className="logo-container">
        <img className='logo' src={minimal ? colorLogo : whiteLogo} alt='tinder logo' />
      </div>
      {!authToken && !minimal && <button onClick={handleClick} className='nav-button'>
        Log In!</button>}


    </nav>
  )
}

export default Nav
