import React from "react";
import { Route, Routes } from "react-router-dom";
import EventDetailsPage from "../views/EventDetailsPage";
import EventListPage from "../views/EventListPage";
import LoginPage from "../views/LoginPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EventListPage />} />
      <Route path="/event/:id" element={<EventDetailsPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
