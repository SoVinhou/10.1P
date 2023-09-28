import React from "react";
import './Card.css'

const Card = (props) => {
    return <div className="column">
        <img src={props.avatar} alt="staff" />
        <p style={{fontSize: "35px", fontWeight:"bold"}}>{props.name}</p>
        <p style={{fontSize: "25px"}}>{props.position}</p>
        <p>{props.rating}</p>
        </div>
}

export default Card;