import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
function AuthModal({ setShowModal, isSignUp }) {
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const handleClick = () => {
    setShowModal(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp && password !== confirmPassword) {
        setError("Passwords did not match")
        return;
      }
      const res = await api.login_or_signup(isSignUp,email,password);
      setCookie('AuthToken', res.data.token);
      setCookie('UserId', res.data.userId);
      const success = res.status === 201;
      if (success && isSignUp) navigate('/onboarding');
      else if (success) navigate('/dashboard');
      window.location.reload();

    } catch (e) {
      console.log(e);
    }

  }
  return (
    <div className='auth-modal'>
      <div className='close-icon' onClick={handleClick} style={{ cursor: 'pointer' }}>
        ⓧ
      </div>
      <h2>{isSignUp ? 'Create Account' : 'Log In'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='email'
          required={true}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type='password'
          id='password'
          name='password'
          placeholder='password'
          required={true}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {isSignUp && <input
          type='password'
          id='password-check'
          name='password-check'
          placeholder='confirm password'
          required={true}
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />}
        <input className='secondary-button' type='submit' />
        <p>{error}</p>
      </form>
    </div>
  )
}

export default AuthModal
