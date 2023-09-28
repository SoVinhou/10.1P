import React from 'react'
import './App.css'
import { Link } from 'react-router-dom';

function ButtonFL() {
    return(
        <Link to="/FindJob">
            <button className="button">See More</button>
        </Link>
    )
}

export default ButtonFL;