import React from "react";
import { NavLink, BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <Router>
      <div id="layout">
        <header>
          <div className="wrapper">
            <nav>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Events
              </NavLink>
              {" | "}
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Login
              </NavLink>
            </nav>
          </div>
        </header>
        <AppRoutes />
      </div>
    </Router>
  );
}
