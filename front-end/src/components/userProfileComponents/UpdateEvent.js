import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateEvent = () => {
  const { eventId } = useParams(); // Get eventId from URL params
  const [updatedEventData, setUpdatedEventData] = useState({}); // Initialize with an empty object
  const [imageFile, setImageFile] = useState(null);

  // Update state with eventData when it changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/event/${eventId}`
        );
        setUpdatedEventData(response.data);
        console.log("Event data:", response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchData();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEventData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated event data submitted:", updatedEventData);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

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

  return (
    <div className="container update-event">
      <h2 className="mt-4 mb-3">Update Event</h2>
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
            value={updatedEventData.name}
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
            value={updatedEventData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={updatedEventData.date}
            onChange={handleChange}
            min={minDate.toISOString().split("T")[0]} // Minimum date is tomorrow
            required
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
            value={updatedEventData.state}
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
            value={updatedEventData.location}
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
            value={updatedEventData.organizer}
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
            value={updatedEventData.category}
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
            onChange={handleImageUpload}
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
            value={updatedEventData.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Event
        </button>
      </form>
    </div>
  );
};

export default UpdateEvent;
