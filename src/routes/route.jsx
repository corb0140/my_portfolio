import { Routes, Route } from "react-router";

import App from "../App";
import HomePage from "../pages/home-page.jsx";
import AboutPage from "../pages/about-page.jsx";
import ProjectsPage from "../pages/projects-page.jsx";
import ContactPage from "../pages/contact-page.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
