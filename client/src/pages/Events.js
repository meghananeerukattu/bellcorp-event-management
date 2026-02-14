import { useEffect, useState } from "react";
import API from "../services/api";
import EventCard from "../components/EventCard";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const fetchEvents = async (query = "") => {
    try {
      const res = await API.get(`/events?search=${query}`);
      setEvents(res.data);
    } catch (error) {
      console.log("Error fetching events");
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents(search);
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Events</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Search</button>
      </form>
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))
      )}
    </div>
  );
}

export default Events;
