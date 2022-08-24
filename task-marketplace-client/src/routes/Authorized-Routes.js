import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthorizedNav from "../components/navigation/Authorized-Nav";
import DashboardPage from "../components/pages/Dashboard";
import AddTask from "../components/pages/AddTask";
import TaskPicker from "../components/pages/PickTask";

export default function AuthorizedRoutes() {
  return (
    <Router>
      <AuthorizedNav />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/pick-task" element={<TaskPicker />} />
        <Route
          path="*"
          element={
            <main>
              <p>Not found.</p>
            </main>
          }
        />
      </Routes>
    </Router>
  );
}
