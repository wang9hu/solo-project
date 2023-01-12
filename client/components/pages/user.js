import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import Item from './item';


const User = () => {
  const { username } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [todoListStatue, setStatue] = useState('you have nothing to do');
  const [dbChanged, setDBChanged] = useState(false);

  const todoListInfo = [...location.state.todoList];

  const complete = () => {}
  const deleteItem = () => {}

  const items = todoListInfo.map((item) => (
      <Item 
        key={item._id}
        time={item.time}
        title={item.title}
        priority={item.priority}
        description={item.description}
        deleteItem={deleteItem}
        complete={complete}
      />
    )
  )

  console.log(items)
  
  // useEffect(() => {
  //   if (dbChanged) {      
  //     fetch()
  //     navigate(`/${username}`, {replace: true, state: {...created}});
  //   } 
  // })

  return (
    <>
      <h1> Hello, {location.state.username}, {todoListStatue} </h1>
      <Link to={{ pathname: `${location.pathname}/newitem`, state: {...location.state} }} >Create new item </Link>
      <div className='itemList'>
        {items}
      </div>
    </>
  )
}

export default User;