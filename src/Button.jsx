import React from 'react'
import './App.css'
import { Link } from 'react-router-dom';

function Button() {
    return(
        <Link to="/FindDev">
            <button className="button">See More</button>
        </Link>
    )
}

export default Button;