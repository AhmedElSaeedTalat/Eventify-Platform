import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBar from "./SideBar";
import "./UserProfilePage.css";
import UserProfile from "./UserProfile";

const UserProfilePage = () => {
  const isLoggedIn = useSelector((state) => state);
  console.log(isLoggedIn);
  const location = useLocation();

  const isUserProfileRoute =
    location.pathname === "/user-profile" ||
    location.pathname === "/user-profile/";

  return (
    <div className="user-profile" style={{ height: "100vh" }}>
      <div className="container-fluid h-100">
        <div className="row h-100">
          {/* Sidebar */}
          <SideBar />

          {/* Main content */}
          <main className="col-md-9" style={{ overflowY: "auto" }}>
            {isUserProfileRoute && <UserProfile />}
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
