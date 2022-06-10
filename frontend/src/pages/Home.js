import React, { useState } from 'react'
import Nav from '../components/Nav';
import AuthModal from '../components/AuthModal';
import { useCookies } from 'react-cookie';

function Home() {
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [isSignUp, setIsSignUp] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const authToken = cookies.AuthToken;
    const handleClick = () => {
        setShowModal(true);
        setIsSignUp(true);
    }
    return (
        <div className='overlay'>
            <Nav minimal={false} authToken={authToken} setIsSignUp={setIsSignUp} setShowModal={setShowModal} />
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
