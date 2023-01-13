import React, { useEffect, useState } from 'react';


const Item = (props) => {
  const weekDays = { 
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }
  const time = new Date(props.time)
  const weekDay = weekDays[time.getDay()];
  const month = time.getMonth();
  const date = time.getDate();
  const hour = ('0' + time.getHours()).slice(-2);
  const minutes = ('0' + time.getMinutes()).slice(-2);


  return (
    <div className='item' id={"priority"+props.id}>
      <div className='itemHeader'>
        <div className="time" id={"time"+props.id}>{month+1}/{date} {weekDay} {hour}:{minutes}</div>
        <div className="priority" id={"priority"+props.id}>{props.priority}</div>
        <button className="completeBtn" onClick={props.complete} id={"completeBtn"+props.id}>{props.completion}</button>
        <button className="deleteBtn" onClick={props.deleteItem} id={"deleteBtn"+props.id}>delete</button>
      </div>
      <div className="title" id={"title"+props.id}>{props.title}</div>
      <div className="description" id={"description"+props.id}>{props.description}</div>
    </div>
  )
}

export default Item;
