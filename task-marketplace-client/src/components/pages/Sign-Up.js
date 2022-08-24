import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Sign_Up_Page() {
  const [fields, set_fields] = useState({
    email: "",
    name: "",
    password: "",
    confirm_password: ""
  });
  const [error, set_error] = useState("");

  const navigate = useNavigate();

  const handle_change = (e) => {
    set_fields({ ...fields, [e.target.name]: e.target.value });
  };

  const handle_submit = async (e) => {
    e.preventDefault();
    if (fields.password.length < 6) {
      return set_error("Password must be at least 6 characters in length.");
    }
    if (fields.confirm_password !== fields.password) {
      return set_error("Password and confirm password must match.");
    }

    try {
      const req = await axios.post("http://localhost:4444/api/user", {
        email: fields.email,
        password: fields.password,
        name: fields.name
      });
      const message = req.data.success;
      return navigate("/signin", {
        replace: true,
        state: {
          message
        }
      });
    } catch (err) {
      const err_message = err.response.data.error;
      return set_error(err_message);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
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
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input
            type="text"
            name="name"
            value={fields.name}
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
        <div style={{ marginTop: "1rem" }}>
          <label htmlFor="confirm_password">Confirm Password</label>
        </div>
        <div>
          <input
            type="password"
            name="confirm_password"
            value={fields.confirm_password}
            onChange={handle_change}
            required
          />
        </div>

        {error ? <p style={{ color: "red" }}>Error: {error}</p> : null}
        <div style={{ marginTop: "1rem" }}>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}
