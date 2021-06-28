import React from "react";
import {GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import "firebase/app";
import { auth } from "../firebase";
import firebase from "firebase/app";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
    return(
        <div id="login-page">
            <div id="login-card">
            <h2>welcome to unichat!</h2>
            <div className="login-button google"
            onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
            >
                <GoogleOutlined /> Sign IN With Google
            </div>
        
            <br /><br/>
            <div className="login-button facebook"
             onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
            >
                <FacebookOutlined /> Sign IN With Facebook
            </div>
            </div>
        </div>
    );

}

export default Login;