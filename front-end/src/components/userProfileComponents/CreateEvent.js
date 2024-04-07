import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent } from "../../reduxToolkit/slices/EventSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateEventPage = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    state: "Active",
    location: "",
    organizer: "",
    category: "",
    price: 0,
    image: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setEventData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setEventData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(eventData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await dispatch(addEvent(formData));
      navigate("/events");
    } catch (error) {
      toast.error("Error creating event. Please try again.");
      if (error.message.toLowerCase() === "unauthorized") {
        // Redirect to login page
        navigate("/login");
      }
    }
  };
  const categoryNames = [
    "Any category",
    "New Groups",
    "Art & Culture",
    "Career & Business",
    "Community & Environment",
    "Dancing",
    "Games",
    "Health & Wellbeing",
    "Hobbies & Passions",
    "Identity & Language",
    "Movements & Politics",
    "Music",
    "Parents & Family",
    "Pets & Animals",
    "Religion & Spirituality",
    "Science & Education",
    "Social Activities",
    "Sports & Fitness",
    "Support & Coaching",
    "Technology",
    "Travel & Outdoor",
    "Writing",
    "Weddings",
  ];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split("T")[0];

  return (
    <div className="container create-event">
      <h2 className="mt-4 mb-3">Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date:
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            required
            min={tomorrowFormatted}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">
            State:
          </label>
          <select
            className="form-select"
            id="state"
            name="state"
            value={eventData.state}
            onChange={handleChange}
            required
          >
            <option value="Active">Active</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location:
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="organizer" className="form-label">
            Organizer:
          </label>
          <input
            type="text"
            className="form-control"
            id="organizer"
            name="organizer"
            value={eventData.organizer}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category:
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={eventData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category...</option>
            {categoryNames.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image:
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={eventData.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;
