import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./EventDetails.css";
import { useSelector } from "react-redux";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [attending, setAttending] = useState(false);
  const [eventData, setEventData] = useState({});

  const { isLoggedIn, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/event/${eventId}`)
      .then((response) => {
        setEventData(response.data);

        // Check if the user is attending the event
        if (
          response.data.attendees &&
          response.data.attendees.includes(userId)
        ) {
          setAttending(true);
        } else {
          setAttending(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching event:", error);
      });
  }, [eventId, userId]);

  const handleAttendClick = () => {
    axios
      .post(`http://localhost:5001/attend-event`, { eventId })
      .then((response) => {
        setAttending(true);
        console.log("Attend event response:", response.data);
      })
      .catch((error) => {
        console.error("Error attending event:", error);
      });
  };

  const handleUnattendClick = () => {
    axios
      .get(`http://localhost:5001/unattend-event/${eventId}`)
      .then((response) => {
        setAttending(false);
        console.log("Unattend event response:", response.data);
      })
      .catch((error) => {
        console.error("Error unattending event:", error);
      });
  };

  // Format date
  const formattedDate = new Date(eventData.date).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="event-details container mt-5">
      {eventData && (
        <div className="row eventParent">
          <div className="col-md-8">
            <h1>{eventData.name}</h1>
            <p className="text-muted">Date: {formattedDate}</p>
            <p className="text-muted">Location: {eventData.location}</p>
            <img
              src={`http://localhost:5001/uploads/${eventData.image}`}
              className="img-fluid mb-4"
              alt="Event"
            />
            <p>{eventData.description}</p>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Event Details</h5>
                <p className="card-text">Price: ${eventData.price}</p>
                <p className="card-text">Category: Any category</p>{" "}
                <p className="card-text">Organizer: {eventData.organizer}</p>
                {isLoggedIn &&
                  (attending ? (
                    <button
                      className="btn btn-danger"
                      onClick={handleUnattendClick}
                    >
                      Unattend
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={handleAttendClick}
                    >
                      Attend
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailsPage;
