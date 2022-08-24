import React from "react";
import { useEffect, useState } from "react";
import firebase_service from "../../services/firebase";
import axios from "axios";

export default function DashboardPage() {
  const [loading_user, set_loading_user] = useState(true);
  const [user, set_user] = useState(null);

  const get_user = async () => {
    try {
        console.log(firebase_service);
      const token = await firebase_service.auth.currentUser.getIdToken(true);
      console.log(token);
      const req = await axios.get("http://localhost:4444/api/user", {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      console.log(req.data);
      if (req.data) {
        set_user(req.data);
        set_loading_user(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    get_user();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      {loading_user ? (
        <p>Loading User</p>
      ) : (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>FirebaseID: {user.firebaseId}</p>
        </div>
      )}
    </>
  );
}
