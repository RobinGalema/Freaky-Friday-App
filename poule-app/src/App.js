import react from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import AppHeader from './components/appHeader';
import Home from './pages/home';
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
              <Link to="/poules">Poules</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/poules">
            <Poules />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
