import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import TinderCard from 'react-tinder-card';
import ChatContainer from '../components/ChatContainer'
import { useCookies } from 'react-cookie';

export default function DashBoard() {
  const [user, setUser] = useState(null);
  const [genderedUsers, setGenderedUsers] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const userId = cookies.UserId



  const updateMatches=async(matchedUserId)=>{
    try{
      await axios.put('http://localhost:8000/addmatch',{
        userId,
        matchedUserId
      })
      const getUser = async () => {
        // console.log('here');
        try {
          const res = await axios.get('http://localhost:8000/user', {
            params: { userId }
          })
          setUser(res.data);
        } catch (e) {
          console.log(e);
        }
      }
      getUser();
    }catch(e){
      console.log(e);
    }
  }
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, swipedUserId) => {
    if(direction==='right'){
      updateMatches(swipedUserId);
    }
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get('http://localhost:8000/user', {
          params: { userId }
        })
        setUser(res.data);
      } catch (e) {
        console.log(e);
      }
    }

    getUser();
    

  }, [userId])
  useEffect(() => {
    const getGenderedUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8000/gendered-users', {
          params: { gender: user?.gender_interest }
        });
        // console.log(res);
        setGenderedUsers(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    getGenderedUsers();


  }, [user])
  const matchedUserIds=user?.matches.map(({user_id})=>user_id).concat(userId);
  const filteredGenderUsers=genderedUsers?.filter(
    genderedUser=>!matchedUserIds.includes(genderedUser.user_id)
  )
  // console.log(user);
  return (
    <>
      {user && <div className='dashboard'>
        <ChatContainer user={user} />
        <div className='swipe-container'>
          <div className='card-container'>
          {filteredGenderUsers?.map((character) =>
              <TinderCard className='swipe' key={character.user_id} onSwipe={(dir) => swiped(dir, character.user_id)} onCardLeftScreen={() => outOfFrame(character.first_name)}>
                <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                  <h3>{character.first_name}</h3>
                </div>
              </TinderCard>
            )}
            <div className='swipe-info'>
              {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}
