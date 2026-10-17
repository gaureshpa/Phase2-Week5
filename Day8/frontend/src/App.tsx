import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import ProjectsPage from "./pages/ProjectsPage";
import AppLayout from "./layouts/AppLayout";
import IssuePage from "./pages/IssuePage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import IssueDetailsPage from "./pages/IssueDetailsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Navigate to="/projects" replace/>} />
      
          <Route path="/login" element={<LoginPage />}></Route>

          {/* ADMIN and AGENT: Projects */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN", "AGENT"]} />}>
            <Route element={<AppLayout />}>
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:ProjectID" element={<ProjectDetailsPage />} />
            </Route>
          </Route>

          {/* ADMIN only: Issues */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]}/>}>
            <Route element={<AppLayout />}>
              <Route path="/issues" element={<IssuePage />} />
              <Route path="/issues/:IssueID" element={<IssueDetailsPage />} />
            </Route>
          </Route>

          {/* All logged in users: Profile */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN", "AGENT", "CUSTOMER"]} />}>
            <Route element={<AppLayout />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* Unauthorized page */}
          <Route path="/unauthorized"
            element={
              <main>
                <h1>403 — Access denied</h1>
                <p>You do not have permission to access this page.</p>
                <a href="/profile">Go to Profile</a>
              </main>
            }
          />
          
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
