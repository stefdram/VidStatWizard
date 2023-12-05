import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import "./App.css";
import { useState } from "react";
import React from "react";
import Signup from "./Signup";
import MainApp from "./search/MainApp";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                email={email}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <MainApp />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
