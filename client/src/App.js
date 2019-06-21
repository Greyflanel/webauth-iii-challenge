import React from 'react';
import './App.css';

import { NavLink, Route, withRouter } from 'react-router-dom';
import Login from './components/Login.js'

import Signup from './components/Signup.js';
import Users from './components/Users.js';



function App(props) {
  const logout = event => {
    event.preventDefault()
    localStorage.removeItem('token')
    props.history.push('/login')
  }
  return (
    <div>
      <header>
        <nav>
        <NavLink to="/signup">Signup</NavLink>
        <NavLink to="/login">Login</NavLink>
          <NavLink to="/users">Users</NavLink>
          <button onClick={ logout }>Log Out</button>
        </nav>
      </header>
      <main>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
        <Route path="/users" component={Users}/>
      </main>
    </div>
  );
}

export default withRouter(App);