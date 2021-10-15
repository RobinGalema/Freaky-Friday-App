import react, { createContext } from 'react';
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
            <Poules />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/overview">
            <Overview />
          </Route>
          <Route path="/">
            <LoginForm onSubmit={handleLogin}/>
          </Route>
        </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
