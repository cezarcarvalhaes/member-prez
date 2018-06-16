import React from "react";
import "./Modal.css";

const Modal = (props)=> (
    <div id="myModal" className= {props.modal || "modal"}>
      <div className="modal-content">
        <span className="close" onClick={props.reset}>&times;</span>
        <p>You clicked this Prez already!</p>
        <p>Your best score: {props.score}</p>
      </div>
    
    </div>
);

export default Modal; 