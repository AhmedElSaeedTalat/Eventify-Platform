import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-1 mb-4">404</h1>
        <h2 className="display-4 mb-4">Page Not Found</h2>
        <p className="lead mb-4">Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="btn btn-primary">Go to Home Page</a>
      </div>
    </div>
  );
};

export default NotFoundPage;
