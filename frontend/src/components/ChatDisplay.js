import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Chat from './Chat'
import ChatInput from './ChatInput'

function ChatDisplay({ user, clickedUser }) {
    const userId = user?.user_id;
    const clickedUserId = clickedUser?.user_id;
    const [userMessages, setUserMessages] = useState(null);
    const [clickedUserMessages, setClickedUserMessages] = useState(null);
    const getUsersMessages = async () => {
        try {
            const res = await axios.get('http://localhost:8000/messages', {
                params: { userId, correspondingUserId: clickedUserId }
            })
            // console.log(res);
            setUserMessages(res.data);
            // return res.data;
        } catch (e) {
            console.log(e);
        }

    }
    const getClientMessages = async () => {
        try {
            const res = await axios.get('http://localhost:8000/messages', {
                params: { userId:clickedUserId, correspondingUserId: userId }
            })
            // console.log(res);
            setClickedUserMessages(res.data);
            // return res.data;
        } catch (e) {
            console.log(e);
        }

    }

    useEffect(()=>{
        getUsersMessages();
        
        getClientMessages();
        // eslint-disable-next-line
    },[]) 
    const messages=[];
    userMessages?.forEach(message=>{
        const formattedMessage={}
        formattedMessage['name']=user?.first_name;
        formattedMessage['img']=user?.url;
        formattedMessage['message']=message.message;
        formattedMessage['timestamp']=message.timestamp
        messages.push(formattedMessage);
    })
    clickedUserMessages?.forEach(message=>{
        const formattedMessage={}
        formattedMessage['name']=clickedUser?.first_name;
        formattedMessage['img']=clickedUser?.url;
        formattedMessage['message']=message.message;
        formattedMessage['timestamp']=message.timestamp
        messages.push(formattedMessage);
    })
    // console.log(messages);
    const descendingOrderMessages=messages?.sort((a,b)=>a.timestamp.localeCompare(b.timestamp));
    return (
        <>
            <Chat descendingOrderMessages={descendingOrderMessages} />
            <ChatInput user={user} clickedUser={clickedUser} getUsersMessages={getUsersMessages} getClientMessages={getClientMessages}/>

        </>
    )
}

export default ChatDisplay
