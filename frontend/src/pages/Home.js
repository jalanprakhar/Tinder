import React, { useState } from 'react'
import Nav from '../components/Nav';
import AuthModal from '../components/AuthModal';

function Home() {
    const[isSignUp,setIsSignUp]=useState(true);
    const [showModal,setShowModal]=useState(false);
    const authToken = false;
    const handleClick = () => {
        // console.log("clicked");
        setShowModal(true);
        setIsSignUp(true)
    }
    return (
        <div className='overlay'>
            <Nav minimal={false} authToken={authToken}setIsSignUp={setIsSignUp} setShowModal={setShowModal}/>
            <div className='home'>
                <h1 className='primary-title'>Swipe Right</h1>
                <button className='primary-button' onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create an Account'}
                </button>
                {showModal && <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />}
            </div>
        </div>
    )
}

export default Home
