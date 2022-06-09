import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card';
import ChatContainer from '../components/ChatContainer'
import { useCookies } from 'react-cookie';
const db = [
  {
    name: 'Richard Hendricks',
    url: 'https://i.imgur.com/PhjFIbc.jpeg'
  },
  {
    name: 'Erlich Bachman',
    url: 'https://i.imgur.com/PhjFIbc.jpeg'
  },
  {
    name: 'Monica Hall',
    url: 'https://i.imgur.com/PhjFIbc.jpeg'
  },
  {
    name: 'Jared Dunn',
    url: 'https://i.imgur.com/PhjFIbc.jpeg'
  },
  {
    name: 'Dinesh Chugtai',
    url: 'https://i.imgur.com/PhjFIbc.jpeg'
  }
]
export default function DashBoard() {

  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const userId = cookies.UserId
  // console.log(userId);
  const getUser = async () => {
    console.log('here');
    try {
      const res = await axios.get('http://localhost:8000/user', {
        params: { userId }
      })
      console.log(res);
      setUser(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }
  // getUser();
  useEffect(() => {
    getUser();
  },[])
  // console.log(user);
  return (
    <>
      {user && <div className='dashboard'>
        <ChatContainer user={user} />
        <div className='swipe-container'>
          <div className='card-container'>
            {characters.map((character) =>
              <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
                <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                  <h3>{character.name}</h3>
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
