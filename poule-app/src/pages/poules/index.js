import { useHistory } from "react-router";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import userData from ".././../data/users.json";
import pouleData from '../../data/poules.json';
import './style.css';

const PouleOverview = (props) => {

    let theUser = userData.users.filter(user => user.userName === props.user)
    console.log(theUser);
    
    let element = theUser[0].poules.map( poule => {
        let thisPoule = pouleData.poules.filter(the_poule => the_poule.id === poule.id)
        console.log(thisPoule);

        return (
            <div className='poule-card' key={poule.id}>
                <Link to={`poule/${poule.id}`}>
                    <h4>{thisPoule[0].name}</h4>
                    <p>Go to poule</p>
                </Link>
            </div>
        );
    })

    return element;
}

function Poules(props){

    // Check if a user is logged in
    const history = useHistory();
    if (!props.isLoggedIn) history.push('/'); 

    return(
        <div className="page-content page-poules">
            <h2>This is the poules page</h2>

            <div className="poules-container">
                <PouleOverview user={props.user}/>
            </div>
        </div>
    );
}

export default Poules;