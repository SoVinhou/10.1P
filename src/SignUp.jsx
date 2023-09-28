import './SignUp.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createUserDocFromAuth } from './routes/utils/firebase';
import {useNavigate} from 'react-router-dom';



const SignUp = (props) => {
    const [contact, setContact] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const {name, value} = event.target;
        setContact((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (contact.password !== contact.confirmPassword) {
            setErrorMessage('*** Passwords do not match ***');
        } else {
            setErrorMessage('');
            try {
                console.log('Creating user:', contact.email);
                const userCredential = await firebase.auth().createUserWithEmailAndPassword(contact.email, contact.password);
                console.log('User created:', (await userCredential).user.email);
                const userDocRef = await createUserDocFromAuth(userCredential.user, {name: contact.name});
                navigate('/LogIn');
            } catch (error) {
                console.error('Error creating user:', error);
            }
        }
    };

    return <div className="header-div">
        <div className="SignUpContainer">
            <h1 style={{marginTop: "60px", fontSize: "40px", fontWeight: "Bold"}}>DevLink Sign Up</h1>
            <h1 style={{marginTop: "0px", marginBottom:"40px", fontSize: "27px", fontWeight: "lighter"}}>Create Your Account</h1>

            <form onSubmit={handleSubmit}> 
                <input
                    name = 'name'
                    type = 'text'
                    placeholder = 'name'
                    onChange = {handleChange}
                    value = {contact.name}
                />

                <input
                    name = 'email'
                    type = 'email'
                    placeholder = 'email'
                    onChange = {handleChange}
                    value = {contact.email}
                />

                <input 
                    name = 'password'
                    type = 'password'
                    placeholder = 'password'
                    onChange = {handleChange}
                    value = {contact.password}
                />

                <input 
                    name = 'confirmPassword'
                    type = 'password'
                    placeholder = 'confirm password'
                    onChange = {handleChange}
                    value = {contact.confirmPassword}
                />  

                <br></br>

                <button type="submit">Sign Up</button>
            </form>

            <h2 style={{marginTop: "-40px", marginBottom:"20px", fontSize: "20px", fontWeight: "lighter"}}>Already have an account?</h2>

            <button type="Sign In"> <Link to="/LogIn">Sign In</Link></button>

            {errorMessage && <p style={{ color: 'red', fontSize:"20px", marginTop:"-40px", fontWeight:"bold"}}>{errorMessage}</p>}

        </div>

    </div>

}

export default SignUp;