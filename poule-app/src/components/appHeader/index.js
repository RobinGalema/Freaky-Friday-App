import './style.css';

function AppHeader(props){
    return(
        <header>
            <div className="container">
                <h1>{(props.name) ? `Welcome ${props.name}` : 'Please log in'}</h1>
            </div>
        </header>
    );
}

export default AppHeader;