import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/medsai-logo2-white.png";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  
  const currentPath = location.pathname;

  const isActive = (path) => {
    if (path === "/") {
      return currentPath === "/" ? "active" : "";
    }
    return currentPath.includes(path) ? "active" : "";
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={`navigation-bar ${className || ""}`}>
      <div className="logo-container">
        <img className="logo" src={logo} alt="image" /> 
        <span className="app-name">MEDS-AI</span>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
        </li>
        
        {isAuthenticated ? (
          // Navigation items for logged-in users
          <>
            <li>
              <Link to="/predict" className={isActive("/predict")}>
                Predict Disease
              </Link>
            </li>
            <li>
              <Link to="/hospital" className={isActive("/hospital")}>
                Hospitals
              </Link>
            </li>
            <li>
              <Link to="/doctors" className={isActive("/doctors")}>
                Doctors
              </Link>
            </li>
            <li>
              <Link to="/predictions" className={isActive("/predictions")}>
                Previous Predictions
              </Link>
            </li>
            <li>
              <span className="user-greeting">Hi, {user?.name}</span>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className="logout-btn"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          // Navigation items for guests/not logged-in users
          <>
            <li>
              <Link to="/login" className={isActive("/login")}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/predict" className={isActive("/predict")}>
                Predict Disease
              </Link>
            </li>
            <li>
              <Link to="/hospital" className={isActive("/hospital")}>
                Hospitals
              </Link>
            </li>
            <li>
              <Link to="/aboutus" className={isActive("/about")}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className={isActive("/contact")}>
                Contact
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Navbar;