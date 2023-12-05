import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logoImage from "./wizhat.png";
import axios from "axios";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = () => {
    axios
      .post("http://localhost:3000/login", { UserId: email, Password: password })
      .then((response) => {
        const token = response.data.token;
        const userId = response.data.userId;
        const name = response.data.name;
        const email = response.data.email;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        setEmail("");
        setPassword("");
        setEmailError("");
        setPasswordError("");
        navigate("/search");
      })
      .catch((error) => {
        console.error("Login error: ", error);
        if (error.response && error.response.status === 409) {
          setPasswordError("Invalid UserId!");
        } else if (error.response && error.response.status === 401) {
          setPasswordError("Invalid Password!");
        } else {
          setPasswordError("An error occurred. Please try again.");
        }
      });
  };

  const onGoHome = () => {
    navigate("/");
  };

  const onSignUp = () => {
    navigate("/signup"); // Replace "/signup" with your actual sign-up route
  };

  return (
    <div className={"mainContainer"}>
      <img src={logoImage} alt="wizhat" className="smallerLogo" />
      <header
        style={{ fontSize: "35px", fontWeight: "bold", marginBottom: "10px" }}
      >
        Login
      </header>
      <p>
        Enter your username and password to login and accesss your saved
        information.{" "}
      </p>
      <p style={{ marginBottom: "23px" }}>
        If no matching login is found, we'll give you the option to sign up &
        create a user based on your inputs, or to try again, in case you
        mistyped or were just being silly.
      </p>
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter username"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter password"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
      </div>
      <label className="errorLabel">{passwordError}</label>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"login"}
        />
      </div>
      {/* <div className="emptyDiv"> </div> */}
      <div className="signupLink">
        <p>
          Not a user?{" "}
          <span onClick={onSignUp} className="signupText">
            Sign up here
          </span>
        </p>
      </div>
      <div className={"buttonContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onGoHome}
          value={"go back to Home"}
        />
      </div>
    </div>
  );
};

export default Login;
