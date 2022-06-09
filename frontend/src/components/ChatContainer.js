import React from 'react'
import ChatDisplay from './ChatDisplay'
import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'

export default function ChatContainer({user}) {
  return (
    <div className='chat-container'>
        <div>
            <ChatHeader user={user}/>
            <button className='option'>
                Matches
            </button>
            <button className='option'>Chat</button>
        </div>
        <MatchesDisplay/>
        <ChatDisplay/>
    </div>
  )
}
