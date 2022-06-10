import axios from 'axios';
import React, { useState } from 'react'

function ChatInput({user, clickedUser, getUsersMessages,getClientMessages,}) {
    const [textArea,setTextArea]=useState('');
    const userId=user?.user_id;
    const clickedUserId=clickedUser?.user_id;


    const addMessage=async()=>{
      if(textArea.trim().length===0){
        return;
      }
      const message={
        timestamp:new Date().toISOString(),
        from_userId:userId,
        to_userId:clickedUserId,
        message:textArea
      }
      try{
        await axios.post('http://localhost:8000/message',{
          message 
        })
        getUsersMessages();
        getClientMessages();
        setTextArea('');
      }catch(e){
        console.log(e);
      }
    }
  return (
    <div className='chat-input'>
      <textarea value={textArea} onChange={(e)=>setTextArea(e.target.value)}/>
      <button className='secondary-button'onClick={addMessage}>Send</button>
    </div>
  )
}

export default ChatInput
