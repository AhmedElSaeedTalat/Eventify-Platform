import React from "react";
import "./Home.css";
import About from "../About/About";
import EventCard from "../EventCard/EventCard";

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
];

function Home() {
  return (
    <>
      <div className="home">
        <div className="container">
          <div className="slogan">
            <h1>Creating Moments That Matter, Together.</h1>
            <p>
              We are a community of creators, innovators, and dreamers who are
              passionate about creating moments that matter. We believe that
              everyone has a story to tell and that every story is worth
              sharing. Our mission is to help you create, share, and celebrate
              the moments that matter most to you.
            </p>
          </div>
        </div>
      </div>
      <About />
      <div className="events">
        <h2>Upcoming Events</h2>
        <div className="container">
          <div className="event-cards row">
            {events.map((event) => (
              <div key={event.id} className="col-md-4 mb-4">
                <EventCard
                  title={event.title}
                  date={event.date}
                  location={event.location}
                  description={event.description}
                  imageSrc={event.imageSrc}
                  goingCount={event.goingCount}
                  isFree={event.isFree}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
