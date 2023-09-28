import './LogIn.css'
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { signInWithGooglePopup, createUserDocFromAuth, getUserDocByUsername} from './routes/utils/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {useNavigate} from 'react-router-dom';

const LogIn = (props) => {

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const logGoogleUser = async() => {
        const {user} = await signInWithGooglePopup();
        createUserDocFromAuth(user);
        const userDocRef = await createUserDocFromAuth(user);
        navigate('/');
    }

    const [contact, setContact] = useState({
        username: "",
        password: ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setContact((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    const handleLogin = async () => {
        try {
            console.log('Logging in user:', contact.username);
            const userCredential = firebase.auth().signInWithEmailAndPassword(contact.username, contact.password);
            console.log('User signed in:', (await userCredential).user.email);
            const userDoc = await getUserDocByUsername(contact.username);
            console.log('User document:', userDoc);
            navigate('/');
            window.alert(`User logged in: ${userDoc.username}`);
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setErrorMessage('*** Invalid username or password ***');
            } else {
                setErrorMessage('An error occurred while logging in');
            }
        }
    }

    return <div className="header-div">
        <div className="LogInContainer">
            <h1 style={{marginTop: "60px", fontSize: "40px", fontWeight: "Bold"}}>DevLink Log In</h1>
            <h1 style={{marginTop: "0px", marginBottom:"40px", fontSize: "27px", fontWeight: "lighter"}}>Enter Information</h1>
            <input
            name = 'username'
            type = 'email'
            placeholder = 'username'
            onChange = {handleChange}
            value = {contact.username}
            />

            <input 
            name = 'password'
            type = 'password'
            placeholder = 'password'
            onChange = {handleChange}
            value = {contact.password}
            />

            <br></br>

            <button type='submit' onClick={handleLogin}>Sign In</button>
            
            <h2 style={{marginTop: "-40px", marginBottom:"20px", fontSize: "20px", fontWeight: "lighter"}}>Don't have an account?</h2>

            <button type="Sign Up"> <Link to="/CreateAccount">Sign Up</Link></button>

            <button style={{marginTop:"-25px"}} onClick={logGoogleUser}> Sign In With Google</button> 

            {errorMessage && <p style={{ color: 'red', fontSize:"20px", marginTop:"-40px", fontWeight:"bold"}}>{errorMessage}</p>}

        </div>

    </div>

}

export default LogIn;