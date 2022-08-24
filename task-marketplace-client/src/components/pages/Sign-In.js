import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import firebase_service from "../../services/firebase";
import { set_authorized } from "../../features/auth/auth-slice";

export default function Sign_In_Page() {
  const location = useLocation();
  const navigate = useNavigate();
  const [fields, set_fields] = useState({
    email: "",
    password: ""
  });
  const [error, set_error] = useState("");

  const handle_change = (e) => {
    set_fields({ ...fields, [e.target.name]: e.target.value });
  };

  const handle_submit = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        firebase_service.auth,
        fields.email,
        fields.password
      );
      if (user) {
        set_authorized();
        navigate("/");
        console.log("Called");
      }
    } catch (err) {
      console.log(err);
      set_error("Invalid email address or password.");
    }
  };

  return (
    <main>
      {location.state && location.state.message ? (
        <p style={{ color: "green" }}>{location.state.message}</p>
      ) : null}
      <h1>Sign In</h1>
      <form onSubmit={handle_submit}>
        <div>
          <label htmlFor="email">Email Address</label>
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={fields.email}
            onChange={handle_change}
            required
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label htmlFor="password">Password</label>
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={fields.password}
            onChange={handle_change}
            required
          />
        </div>
        {error ? <p style={{ color: "red" }}>Error: {error}</p> : null}
        <div style={{ marginTop: "1rem" }}>
          <button type="submit">Sign In</button>
        </div>
      </form>
    </main>
  );
}
