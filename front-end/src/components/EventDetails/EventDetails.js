import React, { useState } from "react";
import "./EventDetails.css";

const EventDetailsPage = () => {
  const [attending, setAttending] = useState(false);

  const handleAttendClick = () => {
    setAttending(true);
  };

  const handleCancelClick = () => {
    setAttending(false);
  };

  return (
    <div className="event-details container mt-5">
      <div className="row">
        <div className="col-md-8">
          <h1>Event Title</h1>
          <p className="text-muted">Date: December 1, 2024</p>
          <p className="text-muted">Location: City Hall, New York</p>
          <img
            src="https://via.placeholder.com/800x400"
            className="img-fluid mb-4"
            alt="Event"
          />
          <p>
            Description: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Event Details</h5>
              <p className="card-text">Price: $10</p>
              <p className="card-text">Category: Music</p>
              <p className="card-text">Organizer: John Doe</p>
              <p className="card-text">Contact: john.doe@example.com</p>
              {attending ? (
                <button className="btn btn-danger" onClick={handleCancelClick}>
                  Cancel
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleAttendClick}>
                  Attend
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
