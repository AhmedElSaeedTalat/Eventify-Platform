import { useState } from "react";

const UpdateEvent = ({ eventData }) => {
  const [updatedEventData, setUpdatedEventData] = useState({ ...eventData });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEventData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? parseFloat(value) : value, // Convert price to number
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any action with the updatedEventData, such as sending it to a server
    console.log("Updated event data submitted:", updatedEventData);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1); // Add one day to today's date

  return (
    <div className="container update-event">
      <h2 className="mt-4 mb-3">Update Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={updatedEventData.title}
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
          <label htmlFor="imageSrc" className="form-label">
            Upload Image:
          </label>
          <input
            type="file"
            className="form-control"
            id="imageSrc"
            name="imageSrc"
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
