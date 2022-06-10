import React, { useState } from 'react'
import ChatDisplay from './ChatDisplay'
import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'

export default function ChatContainer({user}) {
  const [clickedUser,setClickedUser]=useState(null);
  return (
    <div className='chat-container'>
        <div>
            <ChatHeader user={user}/>
            <button className='option' onClick={()=>{setClickedUser(null)
            }} disabled={clickedUser===null}>
                Matches
            </button>
            <button className='option' disabled={clickedUser}>Chat</button>
        </div>
        {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser}/>}
        {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}
    </div>
  )
}
