import React from "react";
import { useState } from "react";
import './style.css';

const NewPoule = (props) => {
    const [pouleName, setPouleName] = new useState('');

    const submitPouleForm = (e) => {
        e.preventDefault();

        props.onSubmit(pouleName);
    }

    return(
        <div className="pop-up-wrapper">
            <div className="container">
                <h4>Create new poule</h4>
                <div className="content-container">
                    <form onSubmit={submitPouleForm}>
                        <label htmlFor=''>Give your poule a name</label>
                        <input type='text' name='pouleName' id='pouleName' value={pouleName} onChange={(e) => {setPouleName(e.target.value)}}/>
                        <input type='submit' value='Create Poule'/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewPoule;