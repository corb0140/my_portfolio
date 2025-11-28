import { Routes, Route } from "react-router";

import App from "../App";
import HomePage from "../pages/home-page.jsx";
import AboutPage from "../pages/about-page.jsx";
import ProjectsHomePage from "../pages/projects-home-page.jsx";
import ProjectPage from "../pages/project-page.jsx";
import ContactPage from "../pages/contact-page.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="projects">
          <Route index element={<ProjectsHomePage />} />
          <Route path=":projectId" element={<ProjectPage />} />
        </Route>
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
