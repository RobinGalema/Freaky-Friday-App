import React from 'react';
import './style.css';


class AppHeader extends React.Component{
    render() {
        return(
        <header>
            <div className="container">
                <h1>{(this.props.name) ? `Welcome ${this.props.name}` : 'Please log in'}</h1>
            </div>
        </header>
        )
    }
}

export default AppHeader;