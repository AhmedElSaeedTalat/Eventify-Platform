import React from "react";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="mb-0">© 2024 Eventify. All Rights Reserved.</p>
          </div>
          <div className="col-md-6">
            <ul className="list-unstyled d-flex justify-content-md-end">
              <li className="me-3">
                <a href="#">Home</a>
              </li>
              <li className="me-3">
                <a href="#">About</a>
              </li>
              <li className="me-3">
                <a href="#">Events</a>
              </li>
              <li className="me-3">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
