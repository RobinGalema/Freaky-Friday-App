import React from "react";
import './style.css';

const FullButton = (props) => {

    return(
        <button className="full-btn" onClick={props.onclick}> {props.text} </button>
    );
}

export default FullButton;