import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const EventCard = ({
  _id,
  name,
  date,
  location,
  description,
  image,
  price,
  state,
}) => {
  // Format date
  const formattedDate = new Date(date).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const events = useSelector((state) => state.events.events);
  console.log("Events:", events);

  // Determine price display
  let priceDisplay;
  if (price <= 0) {
    priceDisplay = "Free";
  } else {
    priceDisplay = `$${price}`;
  }

  const imgUrl = `http://localhost:5001/uploads/${image}`;

  // Determine state color
  const stateColor = state === "Active" ? "text-success" : "text-danger";

  return (
    <div className="card border-primary">
      <img
        src={imgUrl}
        className="card-img-top"
        alt={name}
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <div className="card-body">
        <h5 className="card-title text-center">{name}</h5>
        <p className="card-text">
          <strong>Date:</strong> {formattedDate}
        </p>
        <p className="card-text">
          <strong>Location:</strong> {location}
        </p>
        <p className="card-text">
          <strong>Description:</strong> {description}
        </p>
        <p className="card-text">
          <strong>Price:</strong> {priceDisplay}
        </p>
        <p className={`card-text ${stateColor}`}>
          <strong>State:</strong> {state}
        </p>
        <Link
          to={`event-details/${_id}`}
          className="btn btn-primary d-block mx-auto mt-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
