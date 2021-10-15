import { useHistory } from "react-router";
import pouleData from ".././../data/poules.json"

const PouleOverview = (props) => {
    let value = pouleData.poules.map( poule => {
        return (<p>test {poule.id} | {props.user} </p>);
    });

    return value;
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