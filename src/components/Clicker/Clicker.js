import React from "react";
import "./Clicker.css";

// By extending the React.Component class, Counter inherits functionality from it
const Clicker = (props) =>
    <div className = "navbar-fixed">
        <nav>
            <div className="nav-wrapper indigo darken-3">
                <span className= "score right">Score: {props.score}</span>
                <span className= "message center">{props.message}</span>
                <span className= "top-score left">Top Score: {props.topScore}</span>
            </div>
        </nav>
    </div>
    

export default Clicker;
