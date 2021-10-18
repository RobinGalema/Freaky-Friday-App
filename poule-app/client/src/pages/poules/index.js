import { useHistory } from "react-router";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import userData from ".././../data/users.json";
import pouleData from '../../data/poules.json';
import './style.css';
import FullButton from "../../components/FullButton";
import NewPoule from "../../components/NewPoule";
import { render } from "react-dom";

const PouleOverview = (props) => {

    // Prevent error if the user is not logged in.
    if (!props.user) return (<p>Not logged in</p>);

    let theUser = userData.users.filter(user => user.userName === props.user)
    
    let element = theUser[0].poules.map( poule => {
        let thisPoule = pouleData.poules.filter(the_poule => the_poule.id === poule.id)

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
    const [showPopUp, setShowPopUp] = new useState(false);

    const newPoule = () => {
        console.log('Create new poule');
        setShowPopUp(true);
    }

    const createPoule = (pouleName) => {
        console.log(pouleName);
        setShowPopUp(false);
    }

    // Check if a user is logged in
    const history = useHistory();
    if (!props.isLoggedIn) history.push('/'); 

    return(
        <div className="page-content page-poules">
            <h2>This is the poules page</h2>

            <div className="poules-container">  
                <PouleOverview user={props.user}/>
                <FullButton onclick={newPoule} text="Create new poule"/>
                {showPopUp && (<NewPoule onSubmit={createPoule}/>)}
            </div>
        </div>
    );
}

export default Poules;