import React, { createContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useState } from "react";
import userData from "./data/users.json";
import './App.css';
import AppHeader from './components/appHeader';
import LoginForm from './components/loginForm';
import Navigation from './components/Navigation';
import Overview from './pages/overview';
import Poules from './pages/poules';
import Poule from './pages/poule'
import Profile from './pages/profile';

const checkUserName = (userName) => {
  let userExists = false;

  userData.users.forEach(user => {
    if (!userExists && user.userName === userName) {
      userExists = true;
    }
  });
  return userExists;
}

function App() {
  let [loggedIn, setLoggedIn] = new useState(false);
  let [currentUser, setCurrentUser] = new useState('');
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const handleLogin = (userName) => {
    if (!userName){ // Check if a username is provided
      alert('Provide a username');
      return false;
    }

    if (checkUserName(userName)){ // Check if the user exists
      setLoggedIn(true);
      setCurrentUser(userName);
      return true;
    }
    else {
      alert('This username does not exist!');
    }
  }

  return (
    <div className="App">
        <AppHeader name={currentUser}/>
      <Router>
        <div className="content container">
          <Navigation isLoggedIn={loggedIn}/>
        <Switch>
          <Route path="/poules">
            <Poules isLoggedIn={loggedIn} user={currentUser}/>
          </Route>
          <Route path="/profile">
            <Profile isLoggedIn={loggedIn} user={currentUser}/>
          </Route>
          <Route path="/overview">
            <Overview isLoggedIn={loggedIn} user={currentUser}/>
          </Route>
          <Route path="/poule/:id" exact component={Poule}/> 
          <Route path="/">
            <LoginForm onSubmit={handleLogin}/>
            <div className='server-msg'>
              <p>{!data ? "Loading..." : data}</p>
            </div>
          </Route>
        </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
