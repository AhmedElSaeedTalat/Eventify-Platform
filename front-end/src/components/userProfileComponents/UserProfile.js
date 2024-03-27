import React from "react";

const UserProfile = () => {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "https://via.placeholder.com/150", // Example placeholder image
    // Add additional mock user information as needed
  };

  return (
    <div className="user-profile">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            {/* User picture */}
            <img
              src={user.profilePicture}
              alt={user.name}
              className="rounded-circle"
              style={{ width: "150px", height: "150px" }}
            />
            {/* User name */}
            <h2 className="mt-3">{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
