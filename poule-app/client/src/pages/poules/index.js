import { useHistory } from "react-router";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './style.css';
import FullButton from "../../components/FullButton";
import NewPoule from "../../components/NewPoule";
import { render } from "react-dom";
import AuthObject from "../../services/loginObject";

// Poules class
class Poules extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showPopUp: false,
            loading: true,
        }
    }
    
    componentDidMount(){
        console.log("logged in?", AuthObject.loggedIn, AuthObject.loggedInUser);

        this.getPoules();
    }

    getPoules = () => {
        fetch(`/api/poules/userpoules?id=${AuthObject.userId}`) 
            .then((res) => res.json())
            .then((json) => this.setState({loading:false, data:json}));
    }

    renderOverview = (data) => {
        console.log(data);

        return(
            <div className="poules">
                {data.map((poule) => (
                    <div className='poule-card' key={poule.name}>
                    <Link to={`poule/${poule._id}`}>
                        <h4>{poule.name}</h4>
                        <p>Go to poule</p>
                    </Link>
                </div>
                ))}
            </div>
        )
    }

    newPoule = () => {
        console.log('Create new poule');
        this.setState({showPopUp  : true});
    }

    createPoule = (pouleName) => {
        this.setState({showPopUp  : false});

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: pouleName,
                user: AuthObject.userId
            })
        };

        fetch(`/api/poules`, requestOptions)
            .then(res => res.json())
            .then(data => console.log(data))

        this.getPoules();
    }

    render() {
        const {showPopUp, loading, data} = this.state

        return(
            <div className="page-content page-poules">
            <h2>This is the poules page</h2>

            <div className="poules-container">  
                {loading ? <p>Loading Poules...</p> : this.renderOverview(data)}
                <FullButton onclick={this.newPoule} text="Create new poule"/>
                {showPopUp && (<NewPoule onSubmit={this.createPoule}/>)}
            </div>
        </div>
        )
    }
}

export default Poules;