import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/events/dashboard/me");
        setUpcoming(res.data.upcoming);
        setPast(res.data.past);
      } catch (error) {
        console.log("Error fetching dashboard");
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Dashboard</h2>
      <h3>Upcoming Events</h3>
      {upcoming.length === 0 ? (
        <p>No upcoming events</p>
      ) : (
        upcoming.map((event) => (
          <div key={event._id} style={{ marginBottom: "10px" }}>
            <strong>{event.name}</strong> -{" "}
            {new Date(event.date).toDateString()}
          </div>
        ))
      )}
      <h3 style={{ marginTop: "20px" }}>Past Events</h3>
      {past.length === 0 ? (
        <p>No past events</p>
      ) : (
        past.map((event) => (
          <div key={event._id} style={{ marginBottom: "10px" }}>
            <strong>{event.name}</strong> -{" "}
            {new Date(event.date).toDateString()}
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
