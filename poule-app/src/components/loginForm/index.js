import { useState } from "react";
import reactDom from "react-dom";

const LoginForm = (props) => {

    const [name, setName] = useState("");

    const handleSubmit = () => {
        alert(`The username was ${name}`);
    
        // Check for username in DB
    }

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="userName">
                User Name:
                <input type="text" name="userName" id="userName" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <input type="submit" value="Login" />
        </form>
    );
};

export default LoginForm;