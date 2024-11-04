import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EventDetails from "./components/EventDetails";
import EventList from "./components/EventList";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div id="layout">
        {/* ... seu layout */}
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
