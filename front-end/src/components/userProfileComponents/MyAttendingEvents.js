import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import axios from "axios";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // Initialize useHistory hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/user-events");
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5001/events/${eventId}`);
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleViewDetails = (eventId) => {
    navigate(`/events/event-details/${eventId}`);
  };

  return (
    <div className="container">
      <h2 className="my-4">My Events</h2>
      {events.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {events.map((event) => (
            <div key={event._id} className="col">
              <div className="card border-primary">
                <img
                  src={`http://localhost:5001/uploads/${event.image}`}
                  className="card-img-top"
                  alt={event.name}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{event.name}</h5>
                  <p className="card-text">
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                  <p className="card-text">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="card-text">
                    <strong>Description:</strong> {event.description}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong>{" "}
                    {event.price <= 0 ? "Free" : `$${event.price}`}
                  </p>
                  <p
                    className={`card-text ${
                      event.state === "Active" ? "text-success" : "text-danger"
                    }`}
                  >
                    <strong>State:</strong> {event.state}
                  </p>
                  <p className="card-text">
                    <strong>Attendees:</strong>{" "}
                    {event.attendees ? event.attendees.length : 0}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary d-block mx-auto mt-2"
                      onClick={() => handleViewDetails(event._id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No events found.</p>
      )}
    </div>
  );
};

export default MyEvents;
