import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <aside className="col-md-3 bg-light" style={{ overflowY: "auto" }}>
      <div className="links-container" style={{ paddingTop: "20px" }}>
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
          to="update-event"
          className="d-block p-3 mb-2 bg-light text-dark text-decoration-none"
        >
          Update Event
        </Link>
        <Link
          to="settings"
          className="d-block p-3 mb-2 bg-light text-dark text-decoration-none"
        >
          Settings
        </Link>
        <Link
          to="/logout"
          className="d-block p-3 mb-2 bg-light text-dark text-decoration-none"
        >
          Logout
        </Link>
      </div>
    </aside>
  );
}

export default SideBar;
