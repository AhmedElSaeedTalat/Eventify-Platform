import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EventCard from "../EventCard/EventCard";
import Pagination from "./Pagination";
import { fetchEvents } from "../../reduxToolkit/slices/EventSlice";
import "./EventsPage.css";

const EventsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;

  const dispatch = useDispatch();

  // Fetch events data from Redux store
  const { events, status, error } = useSelector((state) => state.events);
  console.log("Events: ", events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter events with Active state
  const activeEvents = events.filter((event) => event.state === "Active");

  // Get current events based on pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = activeEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <div className="container events-page">
      <h1>Events</h1>
      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="Price" />
        </div>
        <div className="col-md-4">
          <input type="date" className="form-control" placeholder="Date" />
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="Category" />
        </div>
      </div>
      {/* Render event cards or show message if no events */}
      <div className="row">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : status === "failed" ? (
          <p>Error: {error}</p>
        ) : currentEvents.length === 0 ? (
          <p className="text-center">No events</p>
        ) : (
          currentEvents.map((event) => (
            <div key={event.id} className="col-lg-4 col-md-6 mb-4">
              <EventCard {...event} />
            </div>
          ))
        )}
      </div>
      {/* Render pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(activeEvents.length / eventsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default EventsPage;
