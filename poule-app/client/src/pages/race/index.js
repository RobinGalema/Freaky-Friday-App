import React from "react";
import './style.scss';
import AuthObject from "../../services/loginObject";
import RaceInfo from "../../components/RaceInfo";
import { useHistory } from "react-router-dom";

const Race = (props) => {

    const history = useHistory();
    if (!AuthObject.loggedIn) history.push('/');

    const {id} = props.match.params
    const {raceId} = props.match.params;

    return(
        <div className="container">
            <div className="poule-overview">
                <RaceInfo pouleId = {id} raceId= {raceId} />
            </div>
        </div>
    );
}

export default Race;