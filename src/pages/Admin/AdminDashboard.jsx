import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./AdminDashboard.css";

function AdminDashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalStudents: 0,
        totalClients: 0,
        totalProjects: 0,
        activeProjects: 0,
        completedProjects: 0,
        pendingApplications: 0,
        pendingStudentVerifications: 0,
        pendingClientVerifications: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const role = localStorage.getItem("role");

        if (role !== "ADMIN") {
            navigate("/login");
            return;
        }

        loadDashboard();

    }, [navigate]);


    const loadDashboard = async () => {

        try {

            const response =
                await api.get("/admin-dashboard");

            setStats(response.data);

        } catch (error) {

            console.error(
                "Error loading admin dashboard:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    const handleLogout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("name");

        navigate("/login");
    };


    if (loading) {
        return <div>Loading Admin Dashboard...</div>;
    }


    return (
        <div className="admin-dashboard">

            <header className="admin-header">

                <div>
                    <h1>Admin Dashboard</h1>
                    <p>Freelance Platform Administration</p>
                </div>

                <button
                    className="admin-logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </header>


            <div className="admin-layout">

                <aside className="admin-sidebar">

                    <button
                        onClick={() => navigate("/admin-dashboard")}
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={() => navigate("/admin/students")}
                    >
                        Students
                    </button>

                    <button
                        onClick={() => navigate("/admin/clients")}
                    >
                        Clients
                    </button>

                    <button
                        onClick={() => navigate("/admin/projects")}
                    >
                        Projects
                    </button>

                    <button
                        onClick={() => navigate("/admin/applications")}
                    >
                        Applications
                    </button>

                </aside>


                <main className="admin-content">

                    <h2>Platform Overview</h2>

                    <div className="admin-stats">

                        <div className="admin-card">
                            <h3>{stats.totalStudents}</h3>
                            <p>Total Students</p>
                        </div>

                        <div className="admin-card">
                            <h3>{stats.totalClients}</h3>
                            <p>Total Clients</p>
                        </div>

                        <div className="admin-card">
                            <h3>{stats.totalProjects}</h3>
                            <p>Total Projects</p>
                        </div>

                        <div className="admin-card">
                            <h3>{stats.activeProjects}</h3>
                            <p>Active Projects</p>
                        </div>

                        <div className="admin-card">
                            <h3>{stats.completedProjects}</h3>
                            <p>Completed Projects</p>
                        </div>

                        <div className="admin-card">
                            <h3>{stats.pendingApplications}</h3>
                            <p>Pending Applications</p>
                        </div>

                        <div className="admin-card">
                            <h3>
                                {stats.pendingStudentVerifications}
                            </h3>
                            <p>Student Verifications</p>
                        </div>

                        <div className="admin-card">
                            <h3>
                                {stats.pendingClientVerifications}
                            </h3>
                            <p>Client Verifications</p>
                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default AdminDashboard;