import { useHistory } from "react-router";

const Profile = (props) => {

    // Check if a user is logged in
    const history = useHistory();
    if (!props.isLoggedIn) history.push('/'); 

    return (
        <div className="page-content page-home">
            <h2>This is the profile page</h2>
        </div>
    );
}

export default Profile;