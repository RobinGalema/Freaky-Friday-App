import react from "react";
import './style.css';

function AppHeader(props){
    return(
        <header>
            <div className="container">
                <h1>Hello {(props.name) ? props.name : 'F1'}</h1>
            </div>
        </header>
    );
}

export default AppHeader;