import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  // Mock user data
  const user = {
    profilePicture: "https://via.placeholder.com/150", // Example placeholder image
    // Add additional mock user information as needed
  };

  const userName = useSelector((state) => state.auth.userName) || "User";

  return (
    <div className="user-profile">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            {/* User picture */}
            <img
              src={user.profilePicture}
              alt={userName}
              className="rounded-circle"
              style={{ width: "150px", height: "150px" }}
            />
            {/* User name */}
            <h2 className="mt-3">{userName}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
