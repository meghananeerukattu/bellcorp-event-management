import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function EventDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.log("Error fetching event");
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      await API.post(`/events/${id}/register`);
      setMessage("Registered successfully");
      window.location.reload();
    } 
    catch (error) {
  setMessage(error.response?.data?.message || "Registration failed");
}
  };
  const handleCancel = async () => {
    try {
      await API.delete(`/events/${id}/cancel`);
      setMessage("Registration cancelled");
      window.location.reload();
    } catch (error) {
      setMessage("Cancel failed");
    }
  };
  if (!event) return <p>Loading...</p>;
  return (
    <div style={{ padding: "20px" }}>
      <h2>{event.name}</h2>
      <p><strong>Organizer:</strong> {event.organizer}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Available Seats:</strong> {event.availableSeats}</p>
      {message && <p>{message}</p>}
      {user ? (
        <>
          <button onClick={handleRegister} style={{ marginRight: "10px" }}>
            Register
          </button>
          <button onClick={handleCancel}>
            Cancel
          </button>
        </>
      ) : (
        <p>Please login to register</p>
      )}
    </div>
  );
}

export default EventDetails;
