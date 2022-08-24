import React from "react";
import { Link } from "react-router-dom";
import firebase_service from "../../services/firebase";

export default function Authorized_Nav() {
  const log_user_out = async () => {
    
    await firebase_service.auth.signOut();
  };
  return (
    <nav>
      <ul style={{ listStyleType: "none", display: "flex" }}>
        <li style={{ marginRight: ".5rem" }}>
          <Link to="/">Dashboard</Link>
        </li>
        <li style={{ marginRight: ".5rem" }}>
          <Link to="/add-task">Add Task</Link>
        </li>
        <li style={{ marginRight: ".5rem" }}>
          <Link to="/pick-task">Pick Task</Link>
        </li>
        <li>
          <button
            style={{
              textDecoration: "underline",
              border: "none",
              backgroundColor: "inherit",
              fontSize: "1rem",
              padding: 0
            }}
            onClick={log_user_out}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
}
