import react from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import AppHeader from './components/appHeader';
import Overview from './pages/overview';
import Poules from './pages/poules';
import Profile from './pages/profile';

function App() {
  return (
    <div className="App">
      <AppHeader name="Robin"/>
      <Router>
        <nav>
          <div className="container">
          <ul>
            <li>
              <Link to="/poules"><FontAwesomeIcon icon={ faUsers } />Poules</Link>
            </li>
            <li>
              <Link to="/overview"> <FontAwesomeIcon icon={ faHome } />Home</Link>
            </li>
            <li>
              <Link to="/profile"><FontAwesomeIcon icon={ faUser } />Profile</Link>
            </li>
          </ul>
          </div>
        </nav>
        <div className="content container">
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
            <h2>Login will be here</h2>
          </Route>
        </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
