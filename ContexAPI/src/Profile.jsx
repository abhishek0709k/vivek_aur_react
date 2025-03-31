import React, { useContext } from 'react'
import { UserContext } from './context/UserContext'

const Profile = () => {
  const { user } = useContext(UserContext);
  console.log(user.username, user.password)
  if(user.username === undefined || user.password === undefined) return <div>Plese Login</div>
  return <div>Welcome : {user.username}</div>
}

export default Profile;