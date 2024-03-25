const EventCard = ({ title, date, location, description, imageSrc, goingCount, isFree }) => {
  return (
    <div className="card">
    <img src={imageSrc} className="card-img-top" alt={title} style={{ maxWidth: '100%', height: 'auto' }} />
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{date}</p>
      <p className="card-text">{location}</p>
      <p className="card-text">{description}</p>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <span className="text-muted">{goingCount} going</span>
        </div>
        <div>
          {isFree && <span className="badge bg-primary">Free</span>}
        </div>
      </div>
      <a href="#" className="btn btn-primary mt-2">View Details</a>
    </div>
  </div>
  );
}

export default EventCard;