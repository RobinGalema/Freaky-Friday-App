import { useHistory } from "react-router";
import AuthObject from "../../services/loginObject";

const Overview= (props) => {

    // Check if a user is logged in
    const history = useHistory();
    if (!AuthObject.loggedIn) history.push('/'); 

    return(
        <div className="page-content page-overview">
            <h2>This is the starting/overview page</h2>
        </div>
    );
}

export default Overview;