import { Route, Routes } from "react-router-dom";
import EventDetailsPage from "../views/Event/EventDetailsPage";
import EventListPage from "../views/Event/EventListPage";
import LoginPage from "../views/Login/LoginPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EventListPage />} />
      <Route path="/event/:id" element={<EventDetailsPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
