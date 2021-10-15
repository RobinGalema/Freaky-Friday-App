import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'

const Navigation = () => {
    return(
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
    );
}

export default Navigation;