import React, { useEffect, useState } from 'react';


const Item = (props) => {
  return (
    <div className='item'>
      <div className='itemHeader'>
        <div className="time">{props.time}</div>
        <div className="title">{props.title}</div>
        <div className="priority">{props.priority}</div>
        <button className="completeBtn" onClick={props.complete}>complete</button>
        <button className="deleteBtn" onClick={props.deleteItem}>delete</button>
      </div>
      <div className="description">{props.description}</div>
    </div>
  )
}

export default Item;
