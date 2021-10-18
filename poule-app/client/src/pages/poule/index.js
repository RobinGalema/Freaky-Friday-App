const Poule = (props) => {
    // Get the current poule
    const {id} = props.match.params

    return(
        <div className="container">
            <h2>This is the single poule page</h2>
            <p>This is poule ID: {id}</p>
        </div>
    );
}

export default Poule;