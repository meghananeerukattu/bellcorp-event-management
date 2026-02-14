import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "15px" }}>Events</Link>
      {user && (
        <Link to="/dashboard" style={{ marginRight: "15px" }}>
          Dashboard
        </Link>
      )}
      {!user ? (
        <>
          <Link to="/login" style={{ marginRight: "15px" }}>
            Login
          </Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button
          onClick={logout}
          style={{ marginLeft: "10px" }}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;
