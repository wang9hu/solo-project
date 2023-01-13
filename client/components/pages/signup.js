import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'



const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [signupInfo, setSignupInfo] = useState();
  const [created, setCreated] = useState({});

  const createUser = async (e) => {
    e.preventDefault();
    const body = { username, password };
    console.log(body);

    const data = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())

    setCreated(data)
  }
  
  useEffect(() => {
    if (Object.hasOwn(created, 'username')) {      
      setSignupInfo('Create Success!')
      setTimeout(() => {
        navigate(`/${created.username}`, {state: {...created}});
      }, 1000);
    } else if (Object.hasOwn(created, 'err')) {
      setSignupInfo(created.err)
    }
  })




  return (
    <>
      <h1>To do list</h1>
      <Link to='/signup'>Sign Up</Link>
      <br/>
      <Link to='/login'>Login</Link>
      <form onSubmit={createUser}>
      <h1> Welcome! </h1>
        <label className="username">Username:<input type="text" name="username" onChange={e => setUsername(e.target.value)} required /></label>
        <br/>
        <label className="password">Password:<input type="password" id="password" onChange={e => setPassword(e.target.value)} required /></label>
        <br/>
        <button type="submit">Login</button>
        <p>{signupInfo}</p>
      </form>
    </>
  )
}

export default Signup;