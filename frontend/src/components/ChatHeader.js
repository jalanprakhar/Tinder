import React from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function ChatHeader({ user }) {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const logout = () => {
    removeCookie('UserId', cookies.UserId);
    removeCookie('AuthToken', cookies.AuthToken);
    navigate('/')
    window.location.reload();
  }
  return (
    <div className='chat-container-header'>
      <div className='profile'>
        <div className='img-container'>
          <img src={user.url}
            alt={"photo of " + user.first_name} />
        </div>
        <h3>{user.first_name}</h3>
      </div>
      <i className='log-out-icon'
        onClick={logout} style={{ cursor: 'pointer' }}>⇦</i>
    </div>
  )
}

export default ChatHeader
