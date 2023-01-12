import React, { Component } from "react";
import '../css/index.css';
import { Route, Routes } from "react-router-dom"
import Index from './pages/cookie';
import Signup from './pages/signup';
import User from './pages/user';
import Login from './pages/login';
import NewItem from './pages/createNewItem';

class App extends Component {
  render() {
    return (
      <>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:username/*">
            <Route index element={<User />} />
            <Route path="newitem" element={<NewItem />} />
          </Route>
        </Routes>
      </>
    )
  }
}

export default App;