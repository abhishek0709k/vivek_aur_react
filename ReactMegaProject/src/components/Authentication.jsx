import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Authentication = ({ children, authentication = true }) => {

  const authStatus = useSelector((state)=> state.user.status)

  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)

  useEffect(()=>{
      setLoader(false)
  }, [authStatus, authentication, navigate])
  return (
    <div>
        { loader ?  <p className='loader'>Loading...</p> : <div>{children}</div> }
    </div>
  )
}

export default Authentication;