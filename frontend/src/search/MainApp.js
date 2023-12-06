import React, { useState } from "react";
import logoImage from "../vswizlogo2.png";
import "../Home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const MainApp = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editError, setEditError] = useState("");
  const [profile, setProfile] = useState({
    email: localStorage.getItem("email") || "",
    name: localStorage.getItem("name") || "",
    password: "",
  });
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

  const handleEditProfile = () => {
    setEditError("");
    setProfile({ ...profile, password: "" });
    setEditOpen(!editOpen);
  };

  const handleDeleteClick = () => {
    setDeleteOpen(!deleteOpen);
  };

  const handleEditProfileChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleEditProfileSave = () => {
    // logic here todo
    const updatedProfile = {
      UserId: localStorage.getItem("userId") || "",
      Email: profile.email,
      Name: profile.name,
      Password: profile.password,
    };
    axios
      .put("http://localhost:3000/update/user", updatedProfile)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("name", profile.name);
        localStorage.setItem("email", profile.email);
        setProfile({ ...profile, password: "" });
        setEditError("");
        setEditOpen(false);
      })
      .catch((error) => {
        console.error("Error updating user: ", error);
        if (error.response && error.response.status === 409) {
          setEditError("Email already exists!");
        } else {
          setEditError("An error occurred. Please try again.");
        }
      });
  };

  const handleDeleteConfirm = () => {
    const userId = localStorage.getItem("userId");
    console.log("Deleting user:", localStorage.getItem("userId"));
    axios
      .delete(`http://localhost:3000/delete/${userId}`)
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error deleting user: ", error);
      });
  };

  return (
    <>
      <div className="logoContainer">
        <img src={logoImage} alt="VidStatWizard Logo" className="logoTopLeft" />
      </div>

      <header className="textContainer">
        <h1 className="headerTitle">
          Welcome to VidStatWizard, {localStorage.getItem("userId")}
        </h1>
        <div className="dropdown">
          <button className="dropbtn">&#x25BC;</button>
          <div className="dropdown-content">
            <a onClick={handleProfileClick}>My Profile</a>
            <a onClick={handleEditProfile}>Edit Profile</a>
            <a onClick={handleDeleteClick}>Delete Profile</a>
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

      <Dialog open={editOpen} onClose={handleEditProfile}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={profile.email}
            onChange={handleEditProfileChange}
          />
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={profile.name}
            onChange={handleEditProfileChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="text"
            fullWidth
            variant="outlined"
            value={profile.password}
            onChange={handleEditProfileChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditProfile}>Cancel</Button>
          <Button onClick={handleEditProfileSave}>Save</Button>
        </DialogActions>
        {editError && <p className="editErrorMessage">{editError}</p>}
      </Dialog>

      <Dialog open={deleteOpen} onClose={handleDeleteClick}>
        <DialogTitle>Delete Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the profile for
            {" " + localStorage.getItem("userId")}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClick}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Main content of your app goes here */}
      <section>{/* Your app content */}</section>
    </>
  );
};

export default MainApp;