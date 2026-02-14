import { Link } from "react-router-dom";
function EventCard({ event }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "5px"
      }}
    >
      <h3>{event.name}</h3>
      <p><strong>Organizer:</strong> {event.organizer}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
      <p><strong>Available Seats:</strong> {event.availableSeats}</p>
      <Link to={`/events/${event._id}`}>
        View Details
      </Link>
    </div>
  );
}

export default EventCard;
