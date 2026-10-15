import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import ProjectsPage from "./pages/ProjectsPage";
import AppLayout from "./layouts/AppLayout";
import IssuePage from "./pages/IssuePage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import IssueDetailsPage from "./pages/IssueDetailsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to="/projects" replace/>} />
        
        <Route path="/login" element={<LoginPage />}></Route>

        <Route element={<AppLayout />}>
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:ProjectID" element={<ProjectDetailsPage />} />

          <Route path="/issues" element={<IssuePage />} />
          <Route path="/issues/:IssueID" element={<IssueDetailsPage />} />

          <Route path="/profile" element={<ProfilePage />}></Route>
        </Route>        

        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
