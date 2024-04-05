import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../reduxToolkit/slices/authSlice";
import axios from "axios";
import { toast } from "react-toastify";

function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <aside className="col-md-3 bg-light" style={{ overflowY: "auto" }}>
      <div className="links-container" style={{ paddingTop: "20px" }}>
        <Link
          to="my-attending-events"
          className="d-block p-3 mb-2 bg-light text-dark text-decoration-none"
        >
          My Upcoming Events
        </Link>
        <Link
          to="my-events"
          className="d-block p-3 mb-2 bg-light text-dark text-decoration-none"
        >
          My Events
        </Link>
        <Link
          to="create-event"
          className="d-block p-3 mb-2 bg-light text-dark text-decoration-none"
        >
          Create Event
        </Link>
        <Link
          to="settings"
          className="d-block p-3 mb-2 bg-light text-dark text-decoration-none"
        >
          Settings
        </Link>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
