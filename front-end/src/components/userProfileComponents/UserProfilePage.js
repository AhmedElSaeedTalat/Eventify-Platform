import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../../reduxToolkit/slices/authSlice";
import SideBar from "./SideBar";
import { toast } from "react-toastify";
import "./UserProfilePage.css";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("http://localhost:5001/my-session");
        if (!response.data.status) {
          // Session is expired, log out the user
          dispatch(logout());
          toast.error("Your session has expired. Please log in again.");
          navigate("/signin");
        }
      } catch (error) {
        console.error("Error checking session:", error);
        dispatch(logout());
        toast.error("Error checking session. Please log in again.");
        navigate("/signin");
      }
    };

    if (isLoggedIn) {
      checkSession();
    }

    // Cleanup function to cancel pending requests
    return () => {};
  }, [dispatch, isLoggedIn, navigate]);

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
