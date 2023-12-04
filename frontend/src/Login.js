import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logoImage from "./wizhat.png";

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    
    const navigate = useNavigate();
        
    const onButtonClick = () => {
    }

    const onGoHome = () => {
        navigate("/");
    }

    return <div className={"mainContainer"}>
        <img src={logoImage} alt="wizhat" className="smallerLogo" />
       <header style={{ fontSize: "35px", fontWeight: "bold" , marginBottom: "10px"}}>
        Login
      </header>
      <p>Enter your username and password to login and accesss your saved information. </p>
      <p style={{marginBottom: "23px"}}>
        If no matching login is found, we'll give you the option to sign up & create a user based on your inputs, or to try again, in case you mistyped or were just being silly.
      </p>
        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="enter username here..."
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="enter password here..."
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"login"} />
        </div>
        <div className="emptyDiv"> </div>
        <div className={"buttonContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onGoHome}
                value={"go back to Home"} />
        </div> 
    </div>
}

export default Login