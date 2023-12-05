import React, { useState } from "react";
import logoImage from "../vswizlogo2.png";
import "../Home.css";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const MainApp = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove all data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
  };

  return (
    <>
      <div className="logoContainer">
        <img src={logoImage} alt="VidStatWizard Logo" className="logoTopLeft" />
      </div>

      <header className="textContainer">
        <h1 className="headerTitle">Welcome to VidStatWizard, {localStorage.getItem("userId")}</h1>
        <div className="dropdown">
          <button className="dropbtn">&#x25BC;</button>
          <div className="dropdown-content">
            <a onClick={handleProfileClick}>My Profile</a>
            <a>Edit Profile</a>
            <a>Delete Profile</a>
            <a onClick={handleLogout}>Logout</a>
          </div>
        </div>
      </header>

      <Dialog open={profileOpen} onClose={handleProfileClick}>
        <DialogTitle>User Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            User ID: {localStorage.getItem("userId") || "N/A"}
            <br />
            Name: {localStorage.getItem("name") || "N/A"}
            <br />
            Email: {localStorage.getItem("email") || "N/A"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProfileClick} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Main content of your app goes here */}
      <section>{/* Your app content */}</section>
    </>
  );
};

export default MainApp;