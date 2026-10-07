import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminStudents from "./pages/Admin/AdminStudents";
import AdminClients from "./pages/Admin/AdminClients";
import AdminProjects from "./pages/Admin/AdminProjects";
import AdminApplications from "./pages/Admin/AdminApplications";
import StudentPublicProfile from "./pages/Student/StudentPublicProfile";
import ClientProfile from "./pages/Client/ClientProfile";
import StudentProfile from "./pages/Student/StudentProfile";
import Notifications from "./pages/Notifications";
import Messages from "./pages/messaging/Messages";
import Chat from "./pages/messaging/Chat";
import ActiveProjects from "./pages/Client/ActiveProjects";
import MyProjects from "./pages/Client/MyProjects";
import PostProject from "./pages/Client/PostProject";
import ClientApplications from "./pages/Client/ClientApplications";
import SavedProjects from "./pages/Student/SavedProjects";
import MyApplications from "./pages/Student/MyApplications";
import ApplyProject from "./pages/Student/ApplyProject";
import BrowseProjects from "./pages/Student/BrowseProjects";
import ProjectDetails from "./pages/Student/ProjectDetails";
import StudentDashboard from "./Components/StudentDashboard";
import ClientDashboard from "./Components/ClientDashboard";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<LandingPage />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/student-dashboard"
                    element={<StudentDashboard />}
                />

                <Route
                    path="/client-dashboard"
                    element={<ClientDashboard />}
                />

                <Route
    path="/project/:id"
    element={<ProjectDetails />}
/>

<Route
    path="/find-projects"
    element={<BrowseProjects />}
/>
<Route path="/apply/:id" element={<ApplyProject />} />

<Route
    path="/my-applications"
    element={<MyApplications />}
/>

<Route
    path="/saved-projects"
    element={<SavedProjects />}
/>

<Route
    path="/client-applications"
    element={<ClientApplications />}
/>
<Route
    path="/post-project"
    element={<PostProject />}
/>

<Route
    path="/my-projects"
    element={<MyProjects />}
/>

<Route
    path="/active-projects"
    element={<ActiveProjects />}
/>

<Route path="/messages" element={<Messages />} />
<Route path="/chat/:projectId" element={<Chat />} />
<Route
    path="/notifications"
    element={<Notifications />}
/>
<Route
    path="/student-profile"
    element={<StudentProfile />}
/>
<Route
    path="/client-profile"
    element={<ClientProfile />}
/>

<Route
    path="/admin-dashboard"
    element={<AdminDashboard />}
/>

<Route
    path="/admin-dashboard"
    element={<AdminDashboard />}
/>

<Route
    path="/admin/students"
    element={<AdminStudents />}
/>

<Route
    path="/admin/clients"
    element={<AdminClients />}
/>

<Route
    path="/admin/projects"
    element={<AdminProjects />}
/>

<Route
    path="/admin/applications"
    element={<AdminApplications />}
/>

<Route
    path="/student-public-profile/:userId"
    element={<StudentPublicProfile />}
/>
      </Routes>

        </BrowserRouter>
    );
}

export default App;