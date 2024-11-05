import React from "react";
import { NavLink, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EventDetails from "./components/EventDetails";
import EventList from "./components/EventList";
import Login from "./components/Login";

function App() {
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
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
