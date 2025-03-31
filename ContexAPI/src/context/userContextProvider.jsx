import React, { useState } from 'react'
import { UserContext } from './UserContext'

function UserContextProvider({ children }) {
  const [user, setUser] = useState("Vivek")
  return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider