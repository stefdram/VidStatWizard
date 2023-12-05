import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css"; // Reusing the same CSS file as Login for consistent styling

const Signup = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const onSignUpClick = () => {
    if (!name || !userId || !password || !email) {
      setError("Please fill all inputs");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    const user = {
      UserId: userId,
      Email: email,
      Password: password,
      Name: name,
    };

    axios
      .post("http://localhost:3000/create/user", user)
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          // Handle existing UserId or Email
          setError("UserId or Email already exists");
        } else {
          console.error("There was an error!", error);
          setError("An error occurred. Please try again.");
        }
      });
  };

  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
    // Clear the error message when the user starts typing in the email field
    setError("");
  };

  const onGoBack = () => {
    navigate("/login");
  };

  return (
    <div className={"mainContainer"}>
      <header
        style={{ fontSize: "35px", fontWeight: "bold", marginBottom: "10px" }}
      >
        Sign Up
      </header>
      {/* ... Input Fields ... */}
      <div className={"inputContainerSignUp"}>
        <input
          value={userId}
          placeholder="Enter username..."
          onChange={(ev) => setUserId(ev.target.value)}
          className={"inputBox"}
        />
      </div>
      <div className={"inputContainerSignUp"}>
        <input
          value={email}
          placeholder="Enter email..."
          onChange={handleEmailChange}
          className={"inputBox"}
        />
      </div>
      <div className={"inputContainerSignUp"}>
        <input
          value={name}
          placeholder="Enter name..."
          onChange={(ev) => setName(ev.target.value)}
          className={"inputBox"}
        />
      </div>
      <div className={"inputContainerSignUp"}>
        <input
          value={password}
          placeholder="Enter password..."
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
      </div>
      {/* ... Sign Up Button ... */}
      <div className={"inputContainerSignUp"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onSignUpClick}
          value={"Sign Up"}
        />
      </div>
      {/* ... Go Back Link ... */}
      <div className="signupLink">
        <p>
          Already a user?{" "}
          <span onClick={onGoBack} className="signupText">
            Go Back
          </span>
        </p>
      </div>
      {/* ... Error messages ... */}
      {error && <div className="errorLabel">{error}</div>}
    </div>
  );
};

export default Signup;
