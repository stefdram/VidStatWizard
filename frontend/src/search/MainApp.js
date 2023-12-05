import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainApp = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="mainAppContainer">
      <header>
        {/* Your header content, like a title or navigation links */}
        <h1>Welcome to the Main App</h1>
      </header>

      {/* Main content of your app goes here */}
      <section>
        {/* Your app content */}
      </section>

      {/* Logout Button */}
      <footer>
        <button onClick={handleLogout} className="logoutButton">
          Logout
        </button>
      </footer>
    </div>
  );
};

export default MainApp;