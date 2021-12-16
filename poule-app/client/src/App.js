import React, { createContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useState } from "react";
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

  loginValid = await fetch(`http://localhost:3001/api/users/auth/${userName}`)
                .then((res) => res.json())
                .then((json) => {
                  return {
                    valid: (json.userName === userName),
                    userId: json.userId
                  }
                })

  console.log('returning', loginValid)
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

    const loginSucces = await checkUserName(userName)

    if (loginSucces.valid){ // Check if the user exists
      setLoggedIn(true);
      setCurrentUser(userName);

      AuthObject.loggedIn = true;
      AuthObject.loggedInUser = userName;
      AuthObject.userId = loginSucces.userId;
      
      return true;
    }
    else{
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
            <Poules/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/overview">
            <Overview/>
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
