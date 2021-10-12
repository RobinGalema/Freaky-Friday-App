import { useState } from "react";
import reactDom from "react-dom";

const LoginForm = ({onSubmit}) => {

    const [name, setName] = useState("");

    return(
        <form onSubmit={() => onSubmit(name)}>
            <label htmlFor="userName">
                User Name:
                <input type="text" name="userName" id="userName" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <input type="submit" value="Login" />
        </form>
    );
};

export default LoginForm;