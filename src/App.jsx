import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
              <Link to="/">Events</Link> |
              <Link to="/login"> Login</Link>
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
