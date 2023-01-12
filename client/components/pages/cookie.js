import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const index = () => {
  const [cookieStatue, setCookieStatue] = useState(false)
  const [response, setResponse] = useState(null)
  const navigate = useNavigate();

  fetch('/cookie')
  .then(res => res.json())
  .then(data => {
    if(Object.hasOwn(data, 'username')) {
      setCookieStatue(true);
      setResponse(data);
    }
  })

  useEffect(() => {
    if(cookieStatue) {
      navigate(`/${response.username}`, {state: {...response}});
    }
  })

  return (
    <>
      <h1>To do list</h1>
      <Link to='/signup'>Sign Up</Link>
      <br/>
      <Link to='/login'>Login</Link>
    </>
  )
}

export default index;