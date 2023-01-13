import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loginInfo, setLoginInfo] = useState();
  const [login, setLogin] = useState({});

  const verifyUser = async (e) => {
    e.preventDefault();
    const body = { username, password };

    const data = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json()).catch(err => err)

    setLogin(data);
  }
  
  useEffect(() => {
    if (Object.hasOwn(login, 'username')) {
      setLoginInfo('Login Success!')
      setTimeout(() => {
        navigate(`/${login.username}`, {state: {...login}});
      }, 1000);
    } else if (Object.hasOwn(login, 'err')) {
      setLoginInfo(`${login.err}`)
    }
  })




  return (
    <>
      <h1>To do list</h1>
      <Link to='/signup'>Sign Up</Link>
      <br/>
      <Link to='/login'>Login</Link>
      <form className="form" onSubmit={verifyUser}>
      <h1> Welcome Back! </h1>
        <label className="username">Username:<input type="text" name="username" onChange={e => setUsername(e.target.value)} required /></label>
        <br/>
        <label className="password">Password:<input type="password" id="password" onChange={e => setPassword(e.target.value)} required /></label>
        <br/>
        <button type="submit">Login</button>
      </form>
      <p>{loginInfo}</p>
    </>
  )
}

export default Login;