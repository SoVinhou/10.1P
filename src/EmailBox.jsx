import React, { useState } from 'react';
import './EmailBox.css';
import axios from "axios";

function EmailBox() {

    const [email, setEmail] = useState('');

    const HandleEmail = async(e) => {
        e.preventDefault();

        window.alert("Email Sent! If your email is valid, you will receive a signup email.");

        try {
            const sendEmail = email;
            const response = await axios.post('http://localhost:4000/SignUp', {
                email: sendEmail
            }).catch((error) => {
                console.log(error);
            });

        } catch (error) {
            console.log(error);
            window.alert("Error: ", error.message); 
        }
    }

    return (
        <div className="email-box">
            <h2>SIGN UP FOR DAILY INSIDER</h2>
            <div className="form">
                <input type="email" className="form-control" name="email" placeholder="Enter Your Email" required="required" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>    
            <div className="buttonSub">
                <button style={{marginTop: "12px", border:"none", background:"none", color:"white", fontSize:"35px", fontWeight:"bold"}} type="submit" class="btn btn-lg btn-primary btn-block" onClick={HandleEmail}>SUBSCRIBE</button>
            </div> 
        </div>
    )
}


export default EmailBox;