import { useState } from "react";
import { useHistory } from "react-router";
import './style.css';
import reactDom from "react-dom";

const LoginForm = ({onSubmit}) => {

    const [name, setName] = useState("");
    const history = useHistory();
    const handleNav = () => history.push('/overview');

    const submitForm = async (e) => {
        e.preventDefault();
        checkRouting(await onSubmit(name));
    }

    const checkRouting = (loginSucces) => {
        if (loginSucces){
            handleNav();
        }
    }

    return(
        <form className="login-form" onSubmit={submitForm}>
            <label htmlFor="userName">
                User Name:
            </label>
            <input type="text" name="userName" id="userName" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="submit" value="Login" />
        </form>
    );
};

export default LoginForm;