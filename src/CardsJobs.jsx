import React, { useState } from "react";
import "./Jobs.css";
import { DeleteCollectionAndDocument } from "./routes/utils/firebase";

const CardsJobs = (props) => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleDelete = async () => {
    console.log(props);
    await DeleteCollectionAndDocument("jobs", props);
    window.location.reload();
  };

  return (
    <div> 
        <div className="column" onClick={toggleShowAll} style={{ maxWidth: "500px" }}>
            {props.image && (
                <img
                src={props.image}
                alt="Job Image"
                style={{ width: "505px", height: "390px", borderRadius: "20px"}}
                />
            )}
            <h3 style={{ fontSize: "35px"}}>{props.title}</h3>
            {!showAll && <p style={{ fontSize: "25px", fontWeight:"bold"}}>Duration: {props.projectLength}</p>}
            {!showAll && <p style={{ fontSize: "20px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{props.description}</p>}
            {showAll && (
                <div>
                <p style={{ fontSize: "25px", fontWeight:"bold"}}> Duration: {props.projectLength}</p>
                <p style={{ fontSize: "20px", overflow: "hidden", whiteSpace: "pre-wrap", wordWrap: "break-word"}}>{props.description}</p>
                <ul style={{ fontSize: "18px"}}>
                    <li>Type: {props.type}</li>
                    <li>Skills: {props.skills}</li>
                    <li>
                    Payment: {props.minPayment} - {props.maxPayment}
                    </li>
                    <li>Working Hours: {props.workingHours}</li>
                    <li>
                    Experience: {props.experience} for at least {props.experienceDuration}
                    </li>
                </ul>
                </div>
            )}
            <button className="JobseeButton" onClick={toggleShowAll}>
                {showAll ? "Hide Info" : "View Info"}
            </button>
        </div>
        <button className="JobDeleteButton" onClick={handleDelete}>
            <img src = {require("./images/delete.png")} alt="logo" width={24} height={30} />
        </button>
    </div>
  );
};

export default CardsJobs;