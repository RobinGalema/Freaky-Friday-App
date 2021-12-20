import { useHistory } from "react-router";
import AuthObject from "../../services/loginObject";

const Profile = (props) => {

    // Check if a user is logged in
    const history = useHistory();
    if (!AuthObject.loggedIn) history.push('/'); 

    return (
        <div className="page-content page-home">
            <h2>This is the profile page</h2>
        </div>
    );
}

export default Profile;