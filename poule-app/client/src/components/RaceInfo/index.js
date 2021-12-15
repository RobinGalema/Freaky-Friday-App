import React from "react";
import './style.scss'

class RaceInfo extends React.Component{

    pouleId;
    raceId;

    constructor(props){
        super(props);

        this.state = {
            loading: true,
            apiLoading : true
        }

        this.pouleId = props.pouleId;
        this.raceId = props.raceId;
    }

    componentDidMount(){
        fetch(`http://ergast.com/api/f1/2021/${this.raceId}/results.json`)
        .then((res) => res.json())
        .then((json) => this.setState({apiLoading : false, apiData : json.MRData.RaceTable.Races[0]}))
    }

    raceDetails = (data) => {
        console.log(data);

        return(
            <div className="info-wrapper">
                <h3>{data.raceName}</h3>
                <p><span>Round:</span> {data.round}</p>
                <p><span>Circuit:</span> {data.Circuit.circuitName}</p>
            </div>
        )
    }

    render(){
        const {apiLoading, apiData} = this.state;

        return(
            <div className="race-info">
                <h2>Race info</h2>
                {apiLoading ? <p>Race loading</p> : this.raceDetails(apiData)}
            </div>
        )
    }

}

export default RaceInfo