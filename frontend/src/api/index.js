import axios from 'axios';
const API=axios.create({baseURL:'http://localhost:8000'});

export const api={
    getUserMessages:(userId,clickedUserId)=>API.get('/messages', {
        params: { userId, correspondingUserId: clickedUserId }
    }),
    getClientMessages:(userId,clickedUserId)=>API.get('/messages', {
        params: { userId: clickedUserId, correspondingUserId: userId }
    }),
    login_or_signup:(isSignUp,email,password)=>API.post(`/${isSignUp ? 'signup' : 'login'}`, { email, password }),
    postMessage:(message)=>API.post('/message', {
        message
      }),
    getMatchedUsers:(matchedUserIds)=>API.get('/matched-users', {
        params: { userIds: JSON.stringify(matchedUserIds) }
      }),
    addMatch:(userId,matchedUserId)=>API.put('/addmatch', {
        userId,
        matchedUserId
      }),
      getCurrentUser:(userId)=>API.get('/user', {
        params: { userId }
      }),
      getGenderedUsers:(user)=>API.get('/gendered-users', {
        params: { gender: user?.gender_interest }
      }),
      updateUser:(formData)=>API.put('/user', { formData })
}