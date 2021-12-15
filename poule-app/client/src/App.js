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
import AuthObject from './services/loginObject';
import Race from './pages/race';
import NotFound from './pages/NotFound';

const checkUserName = async (userName) => {
  let loginValid;

  loginValid = await fetch(`/login?userName=${userName}`)
                .then((res) => res.json())
                .then((data) => {return (data.status === 200)});
            
  console.log(loginValid);
  return loginValid;
}

function App() {
  let [loggedIn, setLoggedIn] = new useState(false);
  let [currentUser, setCurrentUser] = new useState('');
  const [data, setData] = React.useState(null);
  
  React.useEffect(() => {
    fetch(`/api`)
      .then((res) => res.json())
      .then((data) => setData(data.message));
  });

  const handleLogin = async (userName) => {
    if (!userName){ // Check if a username is provided
      alert('Provide a username');
      return false;
    }

    if (await checkUserName(userName)){ // Check if the user exists
      setLoggedIn(true);
      setCurrentUser(userName);
      AuthObject.loggedIn = true;
      AuthObject.loggedInUser = userName;
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
          <Route path="/poule/:id/:raceId" exact component={Race}  />
          <Route path="/">
            <LoginForm onSubmit={handleLogin}/>
            <div className='server-msg'>
              <p>{!data ? "Loading..." : data}</p>
            </div>
          </Route>
          <Route path='*' exact component={NotFound} />
        </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
