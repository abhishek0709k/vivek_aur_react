import UserContextProvider from './context/userContextProvider'

import './App.css'
import Login from './Login'
import Profile from './Profile'

function App() {

  return (
    <UserContextProvider>
      <h1>Context API</h1>
      <Login/>
      <Profile/>
    </UserContextProvider>
  )
}

export default App
