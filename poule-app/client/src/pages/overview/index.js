import { useHistory } from "react-router";

const Overview= (props) => {

    // Check if a user is logged in
    const history = useHistory();
    if (!props.isLoggedIn) history.push('/'); 

    return(
        <div className="page-content page-overview">
            <h2>This is the starting/overview page</h2>
        </div>
    );
}

export default Overview;