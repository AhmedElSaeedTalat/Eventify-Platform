import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector hook
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Get isLoggedIn state from Redux
  const [isCollapsed, setIsCollapsed] = useState(true); // State to manage navbar collapse

  const handleLinkClick = () => {
    setIsCollapsed(true); // Close navbar collapse when a link is clicked
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
          onClick={() => setIsCollapsed(!isCollapsed)} // Toggle navbar collapse state
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
