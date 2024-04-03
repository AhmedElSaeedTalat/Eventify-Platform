import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logout } from "../../reduxToolkit/slices/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    // Check session ID in session storage on component mount
    const sessionId = sessionStorage.getItem("sessionId");
    if (!sessionId && isLoggedIn) {
      // Session ID expired, perform logout
      handleLogout();
      dispatch(logout()); // Update isLoggedIn state to false
    } else if (sessionId && !isLoggedIn) {
      // If there is a sessionId and the user is not logged in, update isLoggedIn to true
      dispatch(loginSuccess({ message: "Logged in", sessionId }));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5001/logout");
      dispatch(logout());
      toast.success("Logged out successfully");
      sessionStorage.removeItem("sessionId");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleLinkClick = () => {
    setIsCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Eventify
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`}
          id="navbarNavAltMarkup"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                to="/"
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            {location.pathname === "/" && (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#about"
                    onClick={handleLinkClick}
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#contact"
                    onClick={handleLinkClick}
                  >
                    Contact
                  </a>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/events" onClick={handleLinkClick}>
                Events
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/user-profile"
                    onClick={handleLinkClick}
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link nav-logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item auth">
                  <Link
                    className="nav-link"
                    to="/signin"
                    onClick={handleLinkClick}
                  >
                    SignIn
                  </Link>
                </li>
                <li className="nav-item auth">
                  <Link
                    className="nav-link"
                    to="/register"
                    onClick={handleLinkClick}
                  >
                    SignUp
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
