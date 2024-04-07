import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateEvent = () => {
  const { eventId } = useParams(); // Get eventId from URL params
  const [updatedEventData, setUpdatedEventData] = useState({
    name: "",
    description: "",
    date: "",
    state: "",
    location: "",
    organizer: "",
    price: "",
  });

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        _id,
        createrId,
        category,
        image,
        imagePath,
        attendees,
        ...dataWithoutId
      } = updatedEventData;

      await axios.put(
        `http://localhost:5001/event-update/${eventId}`,
        dataWithoutId
      );
      console.log("Updated event data submitted:", dataWithoutId);
      toast.success("Event updated successfully");

      navigate("/user-profile/my-events");
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

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
            type="datetime-local"
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
