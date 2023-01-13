import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import Item from './item';


const User = () => {
  
  const { username } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [dbChanged, setDBChanged] = useState(false);
  const [stateData, setStateData] = useState(location.state)
  console.log(stateData); 

  const todoListInfo = [];
  
  const logout = async (e) => {
    e.preventDefault();
    await fetch('/logout').then(res => res.json());
    navigate('/', { state: {} });
  }
  
  
  const completeAction = async (e) => {
    e.preventDefault();
    const completion = e.target.innerText === 'Completed!' ? false : true;
    const item_id = e.target.id.replace('completeBtn', '');
    const body = { item_id, completion };
    
    const data = await fetch(`/${username}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    setStateData(data)
    setDBChanged(true);
  }
  
  const deleteItem = async (e) => {
    e.preventDefault();
    const item_id = e.target.id.replace('deleteBtn', '');
    const body = { item_id }
    const data = await fetch(`/${username}`, {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    setStateData(data)
    setDBChanged(true);
  }

  todoListInfo.push(...location.state.todoList.sort((a, b) => new Date(a.time).valueOf() - new Date(b.time).valueOf()));
  
  const todoListStatue = todoListInfo.length === 0 ? 'you have nothing to do' : 'here is your to do list';

  const items = todoListInfo.map((item, i) => {
    const completion = item.completion ? "Completed!" : "Incomplete";

    return (<Item 
      key={i}
      id={item._id}
      time={item.time}
      title={item.title}
      priority={item.priority}
      description={item.description}
      deleteItem={deleteItem}
      complete={completeAction}
      completion={completion}
    />)
  })
      
  useEffect(() => {
    if (dbChanged) {     
      setDBChanged(false);
      fetch(`/${username}`)
      .then(res => res.json())
      .then(data => {
        navigate(`/${username}`, { replace: true, state: stateData });
      })
    } 
  })

  return (
    <>
      <h1> Hello, {location.state.username}, {todoListStatue} </h1>
      <Link to={{ pathname: `${location.pathname}/newitem`, state: {...stateData} }} ><button type="button">Create new item </button></Link>
      {/* <Link to={{ pathname: '/', state: {} }} ><button type="button">Log Out</button></Link> */}
      <button type="button" onClick={logout}>Log Out</button>
      <div className='itemList'>
        {items}
      </div>
    </>
  )
}

export default User;