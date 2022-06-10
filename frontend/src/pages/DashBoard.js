import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card';
import ChatContainer from '../components/ChatContainer'
import { useCookies } from 'react-cookie';
import { api } from '../api';

export default function DashBoard() {
  const [user, setUser] = useState(null);
  const [genderedUsers, setGenderedUsers] = useState(null);
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const userId = cookies.UserId



  const updateMatches = async (matchedUserId) => {
    try {
      await api.addMatch(userId,matchedUserId);
      const getUser = async () => {
        try {
          const res = await api.getCurrentUser(userId);
          setUser(res.data);
        } catch (e) {
          console.log(e);
        }
      }
      getUser();
    } catch (e) {
      console.log(e);
    }
  }
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, swipedUserId) => {
    if (direction === 'right') {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction)
    window.location.reload();
  }

  const outOfFrame = (name) => {
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.getCurrentUser(userId)
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
        const res = await api.getGenderedUsers(user);
        setGenderedUsers(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    getGenderedUsers();


  }, [user])
  const matchedUserIds = user?.matches.map(({ user_id }) => user_id).concat(userId);
  const filteredGenderUsers = genderedUsers?.filter(
    genderedUser => !matchedUserIds.includes(genderedUser.user_id)
  )
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
