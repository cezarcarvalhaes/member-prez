import React from "react";
import "./ImageCard.css";

const ImageCard = (props) => (
  <div className="card">
    <div className="card-image">
      <img alt={props.name} src={props.image} id={props.id} onClick= {props.clickPic} data-clicked= {props.clicked}/>
    </div>
  </div>
);

export default ImageCard;
