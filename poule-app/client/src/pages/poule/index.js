import PouleOverview from "../../components/PouleOverview";
import { useHistory } from "react-router-dom";
import AuthObject from "../../services/loginObject";

const Poule = (props) => {
    // Get the current poule
    const {id} = props.match.params

    const history = useHistory();
    if (!AuthObject.loggedIn) history.push('/');

    return(
        <div className="container">
            <div className="poule-overview">
                <PouleOverview pouleId={id}/>
            </div>
        </div>
    );
}

export default Poule;