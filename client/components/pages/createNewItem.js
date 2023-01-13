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
  const [updatedUserInfo, setUpdatedUserInfo] = useState(location.state);
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

  const returnPrevious = () => {
    navigate(-1);
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
      <h1> What you wanna do next? </h1>
      <button className="returnBtn" onClick={returnPrevious}>Return</button>
      <form className="createNewItemForm" onSubmit={addItem}>
        <label>Time:</label>
          <input type="datetime-local" name="time" onChange={e => setTime(e.target.value)} required />
        <label> Title: </label>
          <input type="text" name="title" onChange={e => setTitle(e.target.value)} required />
        <label> Description: </label>
          <input type="textarea" name="description" onChange={e => setDescription(e.target.value)} required />
        <label> Priority: </label>
          <label htmlFor="low"><input type="radio" id="low" name="priority" value="low" checked={ priority === 'low' } onChange={(e) => setPriority(e.target.value)} />Low</label>
          <label htmlFor="medium"><input type="radio" id="medium" name="priority" value="medium" checked={ priority === 'medium' } onChange={(e) => setPriority(e.target.value)} />Medium</label>
          <label htmlFor="high"><input type="radio" id="high" name="priority" value="high" checked={ priority === 'high' } onChange={(e) => setPriority(e.target.value)}/>High</label>
        <button type="submit" >Add items</button>
        <p>{saveItemInfo}</p>
      </form>
    </>
  )
}

export default newItem;