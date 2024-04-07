import "./Home.css";
import About from "../About/About";
import AuthBanner from "../AuthBanner/AuthBanner";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";

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
                <div className="card event-card">
                  <img
                    src={event.imageSrc}
                    className="card-img-top"
                    alt={event.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text">{event.description}</p>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Date:</strong> {event.date}
                      </li>
                      <li className="list-group-item">
                        <strong>Location:</strong> {event.location}
                      </li>
                      <li className="list-group-item">
                        <strong>Going Count:</strong> {event.goingCount}
                      </li>
                      <li className="list-group-item">
                        <strong>Is Free:</strong> {event.isFree ? "Yes" : "No"}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />
      <AuthBanner />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
