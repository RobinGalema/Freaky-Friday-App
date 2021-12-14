import React from "react";
import './style.css';
import AuthObject from "../../services/loginObject";

class PouleOverview extends React.Component{
    pouleId;
    currentUser;

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
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
    }

    renderPoule = (data) => {
        return(
            <div className="poule-inner">
                <h3>{data.name}</h3>
            </div>
        )
    }

    render(){

        const {loading, data} = this.state;

        return(
            <div className="poule-wrapper">
                {loading ? <p>Loading Poules...</p> : this.renderPoule(data)}
            </div>
        )
    }

}

export default PouleOverview;