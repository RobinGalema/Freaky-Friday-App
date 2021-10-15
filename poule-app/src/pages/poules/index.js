import { useHistory } from "react-router";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import userData from ".././../data/users.json"

const PouleOverview = (props) => {

    let theUser = userData.users.filter(user => user.userName === props.user)
    console.log(theUser);
    
    let element = theUser[0].poules.map( poule => {
        return (
            <Link key={poule.id} to={`poule/${poule.id}`}>Go to poule</Link>
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