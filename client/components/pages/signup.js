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
    } 
  })




  return (
    <>
      <h1>To do list</h1>
      <Link to='/signup'>Sign Up</Link>
      <br/>
      <Link to='/login'>Login</Link>
      <form onSubmit={createUser}>
        <h1> This is the signup page </h1>
        <label>Username:</label>
        <input type="text" name="username" onChange={e => setUsername(e.target.value)} required />
        <label> Password: </label>
        <input type="password" id="password" onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Create User</button>
        <p>{signupInfo}</p>
      </form>
    </>
  )
}

export default Signup;