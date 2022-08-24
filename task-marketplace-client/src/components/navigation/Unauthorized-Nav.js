import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized_Nav() {
  return (
    <nav>
      <ul style={{ listStyleType: "none", display: "flex" }}>
        <li style={{ marginRight: ".5rem" }}>
          <Link to="/">Home</Link>
        </li>
        <li style={{ marginRight: ".5rem" }}>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      </ul>
    </nav>
  );
}
