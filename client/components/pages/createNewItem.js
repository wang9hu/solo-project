import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const newItem = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [time, setTime] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [priority, setPriority] = useState();
  const [createdNewItem, setCreatedNewItem] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({...location.state});
  const [saveItemInfo, setSaveItemInfo] = useState();



  const addItem = async (e) => {
    e.preventDefault();
    const body = { time, title, description, priority };

    const data = await fetch(`${location.pathname}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
    
    setCreatedNewItem(true);
    setUpdatedUserInfo(data);

  }

  useEffect(() => {
    if (createdNewItem) {      
      setSaveItemInfo('Add Success!')
      setTimeout(() => {
        navigate(`/${updatedUserInfo.username}`, {state: {...updatedUserInfo}});
      }, 1000);
    } 
  })


  return (
    <>
      <h1> This is the add item page </h1>
      <form className="createNewItemForm" onSubmit={addItem}>
        <label>Time:</label>
          <input type="datetime-local" name="time" onChange={e => setTime(e.target.value)} required />
        <label> Title: </label>
          <input type="text" name="title" onChange={e => setTitle(e.target.value)} required />
        <label> Description: </label>
          <input type="textarea" name="description" onChange={e => setDescription(e.target.value)} required />
        <label> Priority: </label>
          <input type="radio" id="low" name="priority" value="low" checked={ priority === 'low' } onChange={(e) => setPriority(e.target.value)} /> 
          <label htmlFor="low">Low</label>
          <input type="radio" id="medium" name="priority" value="medium" checked={ priority === 'medium' } onChange={(e) => setPriority(e.target.value)} />
          <label htmlFor="medium">Medium</label>
          <input type="radio" id="high" name="priority" value="high" checked={ priority === 'high' } onChange={(e) => setPriority(e.target.value)}/>
          <label htmlFor="high">High</label>
        <button type="submit">Add items</button>
        <p>{saveItemInfo}</p>
      </form>
    </>
  )
}

export default newItem;