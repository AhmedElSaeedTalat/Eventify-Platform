import React, { useState } from "react";
import EventCard from "../EventCard/EventCard";
import Pagination from "./Pagination";
import "./EventsPage.css";

const events = [
  {
    id: 1,
    title: "Sample Event 1",
    date: "December 1, 2024",
    location: "City Hall, New York",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageSrc: "https://via.placeholder.com/300",
    goingCount: 10,
    isFree: true,
  },
  {
    id: 2,
    title: "Sample Event 2",
    date: "December 15, 2024",
    location: "Convention Center, Chicago",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageSrc: "https://via.placeholder.com/300",
    goingCount: 5,
    isFree: false,
  },
  {
    id: 3,
    title: "Sample Event 3",
    date: "January 10, 2025",
    location: "Exhibition Hall, Los Angeles",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageSrc: "https://via.placeholder.com/300",
    goingCount: 20,
    isFree: true,
  },
  {
    id: 4,
    title: "Sample Event 4",
    date: "February 5, 2025",
    location: "Conference Center, San Francisco",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageSrc: "https://via.placeholder.com/300",
    goingCount: 8,
    isFree: true,
  },
  {
    id: 5,
    title: "Sample Event 5",
    date: "December 1, 2024",
    location: "City Hall, New York",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageSrc: "https://via.placeholder.com/300",
    goingCount: 10,
    isFree: true,
  },
  {
    id: 6,
    title: "Sample Event 6",
    date: "December 15, 2024",
    location: "Convention Center, Chicago",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageSrc: "https://via.placeholder.com/300",
    goingCount: 5,
    isFree: false,
  },
  {
    id: 7,
    title: "Sample Event 7",
    date: "January 10, 2025",
    location: "Exhibition Hall, Los Angeles",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageSrc: "https://via.placeholder.com/300",
    goingCount: 20,
    isFree: true,
  },
  {
    id: 8,
    title: "Sample Event 8",
    date: "February 5, 2025",
    location: "Conference Center, San Francisco",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageSrc: "https://via.placeholder.com/300",
    goingCount: 8,
    isFree: true,
  },
];

const EventsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3; // Number of events per page

  // Get current events based on pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
      {/* Render event cards */}
      <div className="row">
        {currentEvents.map((event) => (
          <div key={event.id} className="col-lg-4 col-md-6 mb-4">
            <EventCard {...event} />
          </div>
        ))}
      </div>
      {/* Render pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(events.length / eventsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default EventsPage;
