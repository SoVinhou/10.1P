import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import lottie from 'lottie-web';

function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();
    useEffect (() => {
        console.log(auth.currentUser);
        setUser(auth.currentUser);
    })

    const logOut =()=>{
        auth.signOut();
        setUser(null);
        // navigate('/Profile');
        window.location.reload();
    }

    const container = useRef(null);

    useEffect(() => {
      lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: require('./json/website-maintenance.json')
      })
    }, [])
    
    return (
      <div>
        <div className="container" ref={container} style={{ width: "500px", height: "500px", overflow: "hidden", marginLeft:"900px"}}></div>
        {user && (
            <div>
                <h1 style={{ fontSize:"45px", marginTop:"10px", textAlign: "center" }}> Welcome Back: {user.email}</h1>
                <button type="submit" style={{marginTop:"70px", marginBottom:"100px"}} onClick={logOut}>Log Out</button>
            </div>
        )}
        { !user && (
            <div>
                <h1 style={{ fontSize:"45px", marginTop:"10px", marginBottom:"100px", textAlign: "center" }}> You Are Not Logged In </h1>
            </div>
        )}
      </div>
    )
}


export default Profile;