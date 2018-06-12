import React from "react";

// By extending the React.Component class, Counter inherits functionality from it
const Clicker = (props) =>

    <nav>
        <div className="nav-wrapper">
            <a href="" className="brand-logo">Rocko's Modern Click!</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>Score: <span>{props.score}</span></li>
            </ul>
        </div>
    </nav>


export default Clicker;
