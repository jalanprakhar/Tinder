import React, { useEffect, useState } from 'react'
import { api } from '../api';

function MatchesDisplay({ matches, setClickedUser }) {

  const [matchedProfiles, setMathchedProfiles] = useState(null);
  const matchedUserIds = matches.map(({ user_id }) => user_id);
  const getMatches = async () => {
    try {
      const res = await api.getMatchedUsers(matchedUserIds)
      setMathchedProfiles(res.data);
    } catch (e) {
      console.log(e);
    }

  }
  useEffect(() => {
    getMatches();
    // eslint-disable-next-line
  }, [])
  return (
    <div className='matches-display'>
      {matchedProfiles?.map((match, _index) => (
        <div key={_index} className="match-card" onClick={() => { setClickedUser(match) }}>
          <div className='img-container'>
            <img src={match?.url} alt={match?.first_name + 'profile'} />

          </div>
          <h3>{match?.first_name}</h3>
        </div>
      ))}
    </div>
  )
}

export default MatchesDisplay
