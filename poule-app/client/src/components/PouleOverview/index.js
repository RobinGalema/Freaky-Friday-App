import React from "react";
import './style.scss';
import AuthObject from "../../services/loginObject";
import { Link } from "react-router-dom";

class PouleOverview extends React.Component{
    pouleId;
    currentUser;

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            racesLoading: true
        }

        this.pouleId = props.pouleId
        this.currentUser = AuthObject.loggedInUser;
    }

    componentDidMount(){
        console.log("The poule id was", this.pouleId);

        fetch(`/api/poules?userName=${this.currentUser}&loggedIn=true&pouleId=${this.pouleId}`)
        .then((res) => res.json())
        .then((json) => {
            this.setState({loading:false, data:json.data});
            console.log(this.state.data);
        });

        fetch('http://ergast.com/api/f1/current.json')
        .then((res) => res.json())
        .then((json) =>{ 
            this.setState({racesLoading: false, races: json.MRData.RaceTable.Races})
            console.log(this.state.races) 
        });
    }

    renderPoule = (data) => {
        return(
            <div className="poule-inner">
                <div className="races">
                    <ul>
                        {data.map(race => (
                            <li key={race.round}>
                            <Link to={`/poule/${this.pouleId}/${race.round}`}>
                              {race.raceName}
                            </Link>  
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    render(){

        const {loading, racesLoading, data, races} = this.state;

        return(
            <div className="poule-wrapper">
                {loading ? <p>Loading Poules...</p> : <h1>{data.name}</h1>}
                <h2>Stadings</h2>
                <h2>Races (2021 season)</h2>
                {racesLoading ? <p>Loading Races...</p> : this.renderPoule(races)}
                <h2>Settings</h2>
                <button>Invite members</button>
                <button className="delete-btn">Delete Poule</button>
            </div>
        )
    }

}

export default PouleOverview;