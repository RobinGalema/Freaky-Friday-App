import { useHistory } from "react-router";

function Poules(props){

    // Check if a user is logged in
    const history = useHistory();
    if (!props.isLoggedIn) history.push('/'); 

    return(
        <div className="page-content page-poules">
            <h2>This is the poules page</h2>
        </div>
    );
}

export default Poules;