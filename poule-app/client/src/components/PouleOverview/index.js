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
            racesLoading: true,
            showInviteForm: false,
            userName: "",
        }

        this.pouleId = props.pouleId
        this.currentUser = AuthObject.loggedInUser;
    }

    componentDidMount(){
        console.log("The poule id was", this.pouleId);

        fetch(`http://localhost:3001/api/poules/poule?id=${this.pouleId}`)
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

    /**
     * Fucntion to handle the form submission that sends a POST request to the back-end
     * @param {Event} e 
     */
    submitInviteForm = async (e) => {
        e.preventDefault();

        // Create the options for the POST request
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: this.state.userName, poule : this.pouleId})
        }

        // Send POST request to the server
        let response = await fetch('http://localhost:3001/api/poules/add', options)
            .then((res) => {return res})

        // Close the invite form
        this.setState({showInviteForm: false});

        // Show dialog based on the response from the server
        switch(response.status){
            case (200) :
                alert(`User ${this.state.userName} added!`);
                break;

            case (404) :
                alert(`User ${this.state.userName} does not exist!`);
                break;

            default :
                alert(`User ${this.state.userName} added!`);
        }

        this.setState({userName : ""});
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

    renderInviteForm = () => {
        return(
            <div className="form-wrapper">
                <form onSubmit={this.submitInviteForm}>
                        <label htmlFor=''>Username</label>
                        <input type='text' name='userName' id='userName' value={this.state.userName} onChange={(e) => {this.setState({userName : e.target.value})}}/>
                        <input type='submit' value='Invite Member'/>
                    </form>
                    <button class='close' onClick={() => {this.setState({showInviteForm : false})}}>Cancel</button>
            </div>
        )
    }

    render(){

        const {loading, racesLoading, data, races, showInviteForm} = this.state;

        return(
            <div className="poule-wrapper">
                {loading ? <p>Loading Poules...</p> : <h1>{data.name}</h1>}
                <h2>Standings</h2>
                <h2>Races (2021 season)</h2>
                {racesLoading ? <p>Loading Races...</p> : this.renderPoule(races)}
                <h2>Settings</h2>
                <button onClick={() => {this.setState({showInviteForm : true})}}>Invite members</button>
                <button className="delete-btn">Delete Poule</button>
                {showInviteForm ? this.renderInviteForm() : false}
            </div>
        )
    }

}

export default PouleOverview;