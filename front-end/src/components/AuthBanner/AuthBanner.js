import React from "react";

const AuthBanner = () => {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6">
          <div className="text-center text-md-start mb-4">
            <h2>Join Eventify</h2>
            <p>
              People use Eventify to discover and participate in exciting
              events, connect with like-minded individuals, and explore their
              interests together. Membership is free.
            </p>
            <a href="#" className="btn btn-primary">
              Sign up
            </a>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src="https://via.placeholder.com/400"
            className="img-fluid"
            alt="Eventify"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthBanner;
