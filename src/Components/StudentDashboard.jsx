import { useCallback, useEffect, useState } from "react";
import DashboardActions from "../pages/DashboardActions";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./StudentDashboard.css";

function StudentDashboard() {
    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState("Dashboard");
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadDashboard = useCallback(async () => {
        const userId = localStorage.getItem("userId");
        const role = localStorage.getItem("role");

        if (!userId || role !== "STUDENT") {
            setError("Student login information was not found.");
            setLoading(false);
            return;
        }

        try {
            const response = await api.get(
                `/student-dashboard/${userId}`
            );

            setDashboard(response.data);
            setError("");
        } catch (err) {
            console.error("Error loading student dashboard:", err);
            setError(
                err.response?.data?.message ||
                "Unable to load dashboard data."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadDashboard();

        // Refresh dashboard data every 10 seconds.
        const interval = setInterval(loadDashboard, 10000);

        // Refresh immediately when the user returns to the tab.
        const handleFocus = () => loadDashboard();
        window.addEventListener("focus", handleFocus);

        return () => {
            clearInterval(interval);
            window.removeEventListener("focus", handleFocus);
        };
    }, [loadDashboard]);

    const studentName =
        dashboard?.studentName ||
        localStorage.getItem("name") ||
        "Student";

    const profileCompletion =
        dashboard?.profileCompletion ?? 0;

    const totalApplications =
        dashboard?.totalApplications ?? 0;

    const activeProjectsCount =
        dashboard?.activeProjectsCount ?? 0;

    const completedProjectsCount =
        dashboard?.completedProjectsCount ?? 0;

    const totalEarnings =
        dashboard?.totalEarnings ?? 0;

    const unreadNotifications =
        dashboard?.unreadNotifications ?? 0;

    const applications =
        dashboard?.recentApplications || [];

    const projects =
        dashboard?.activeProjects || [];

    const recommendedProjects =
        dashboard?.recommendedProjects || [];

    const formatCurrency = (amount) => {
        if (amount === null || amount === undefined) {
            return "₹0";
        }

        return `₹${Number(amount).toLocaleString("en-IN")}`;
    };

    const formatBudget = (min, max) => {
        if (min != null && max != null) {
            return `${formatCurrency(min)} - ${formatCurrency(max)}`;
        }

        if (min != null) {
            return `From ${formatCurrency(min)}`;
        }

        if (max != null) {
            return `Up to ${formatCurrency(max)}`;
        }

        return "Budget not specified";
    };

    const formatStatus = (status) => {
        if (!status) {
            return "Unknown";
        }

        return status
            .replace(/_/g, " ")
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("name");

        navigate("/login");
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);

        if (menu === "Dashboard") {
            navigate("/student-dashboard");
        }

        if (menu === "Find Projects") {
            navigate("/find-projects");
        }

        if (menu === "Applications") {
            navigate("/my-applications");
        }

        if (menu === "Projects") {
            navigate("/active-projects");
        }

        if (menu === "Saved Projects") {
            navigate("/saved-projects");
        }

        if (menu === "Completed") {
            navigate("/completed-projects");
        }

        if (menu === "Messages") {
            navigate("/messages");
        }

        if (menu === "Notifications") {
            navigate("/notifications");
        }

        if (menu === "Profile") {
            navigate("/student-profile");
        }
    };

    return (
        <div className="student-dashboard">

            {/* ================= SIDEBAR ================= */}

            <aside className="student-sidebar">

                <div className="dashboard-logo">
                    Freelance<span>Hub</span>
                </div>

                <div className="student-profile-mini">

                    <div className="profile-avatar">
                        {studentName.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h4>{studentName}</h4>
                        <p>Student / Freelancer</p>
                    </div>
                <DashboardActions
    role="STUDENT"
    showBack={false}
/>
                </div>

                <nav className="dashboard-menu">

                    <button
                        className={
                            activeMenu === "Dashboard"
                                ? "menu-item active"
                                : "menu-item"
                        }
                        onClick={() =>
                            handleMenuClick("Dashboard")
                        }
                    >
                        <span>🏠</span>
                        Dashboard
                    </button>

                    <button
                        className={
                            activeMenu === "Find Projects"
                                ? "menu-item active"
                                : "menu-item"
                        }
                        onClick={() =>
                            handleMenuClick("Find Projects")
                        }
                    >
                        <span>🔍</span>
                        Find Projects
                    </button>

                    <button
                        className={
                            activeMenu === "Applications"
                                ? "menu-item active"
                                : "menu-item"
                        }
                        onClick={() =>
                            handleMenuClick("Applications")
                        }
                    >
                        <span>📄</span>
                        My Applications
                    </button>

                    <button
                        className={
                            activeMenu === "Projects"
                                ? "menu-item active"
                                : "menu-item"
                        }
                        onClick={() =>
                            handleMenuClick("Projects")
                        }
                    >
                        <span>📁</span>
                        Active Projects
                    </button>

                    <button
                        className={
                            activeMenu === "Saved Projects"
                                ? "menu-item active"
                                : "menu-item"
                        }
                        onClick={() =>
                            handleMenuClick("Saved Projects")
                        }
                    >
                        <span>❤️</span>
                        Saved Projects
                    </button>

                    <button
                        className={
                            activeMenu === "Completed"
                                ? "menu-item active"
                                : "menu-item"
                        }
                        onClick={() =>
                            handleMenuClick("Completed")
                        }
                    >
                        <span>✅</span>
                        Completed
                    </button>

                    <button
                        className={
                            activeMenu === "Messages"
                                ? "menu-item active"
                                : "menu-item"
                        }
                        onClick={() =>
                            handleMenuClick("Messages")
                        }
                    >
                        <span>💬</span>
                        Messages
                    </button>

                    <button
                        className={
                            activeMenu === "Notifications"
                                ? "menu-item active"
                                : "menu-item"
                        }
                        onClick={() =>
                            handleMenuClick("Notifications")
                        }
                    >
                        <span>🔔</span>
                        Notifications
                    </button>

                    <button
                        className={
                            activeMenu === "Profile"
                                ? "menu-item active"
                                : "menu-item"
                        }
                        onClick={() =>
                            handleMenuClick("Profile")
                        }
                    >
                        <span>👤</span>
                        My Profile
                    </button>

                </nav>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    🚪 Logout
                </button>

            </aside>

            {/* ================= MAIN CONTENT ================= */}

            <main className="student-main">

                {/* ================= TOP BAR ================= */}

                <header className="dashboard-topbar">

                    <div>

                        <h1>
                            Welcome back,{" "}
                            {studentName.split(" ")[0]}! 👋
                        </h1>

                        <p>
                            Here's what's happening with your
                            freelance career.
                        </p>

                    </div>

                    <div className="topbar-right">

                        <button
                            className="notification-button"
                            onClick={() =>
                                handleMenuClick("Notifications")
                            }
                        >
                            🔔
                            <span>{unreadNotifications}</span>
                        </button>

                        <div className="top-avatar">
                            {studentName.charAt(0).toUpperCase()}
                        </div>

                    </div>

                </header>

                {/* ================= ERROR ================= */}

                {error && (
                    <div
                        style={{
                            padding: "12px 16px",
                            marginBottom: "16px",
                            borderRadius: "8px",
                            background: "#fff1f1",
                            color: "#b42318"
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* ================= PROFILE COMPLETION ================= */}

                <section className="profile-completion">

                    <div className="completion-text">

                        <div className="completion-icon">
                            ✨
                        </div>

                        <div>

                            <h3>
                                Complete your profile
                            </h3>

                            <p>
                                A complete profile increases your
                                chances of getting hired.
                            </p>

                        </div>

                    </div>

                    <div className="completion-progress">

                        <div className="progress-number">
                            {profileCompletion}%
                        </div>

                        <div className="progress-bar">

                            <div
                                className="progress-fill"
                                style={{
                                    width:
                                        `${profileCompletion}%`
                                }}
                            />

                        </div>

                        <button
                            onClick={() =>
                                handleMenuClick("Profile")
                            }
                        >
                            Complete Profile
                        </button>

                    </div>

                </section>

                {/* ================= STATISTICS ================= */}

                <section className="stats-grid">

                    <div className="stat-card">

                        <div className="stat-icon purple">
                            📄
                        </div>

                        <div>

                            <p>Total Applications</p>

                            <h2>
                                {loading ? "..." : totalApplications}
                            </h2>

                        </div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon blue">
                            🚀
                        </div>

                        <div>

                            <p>Active Projects</p>

                            <h2>
                                {loading ? "..." : activeProjectsCount}
                            </h2>

                        </div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon green">
                            ✅
                        </div>

                        <div>

                            <p>Completed Projects</p>

                            <h2>
                                {loading ? "..." : completedProjectsCount}
                            </h2>

                        </div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon orange">
                            💰
                        </div>

                        <div>

                            <p>Total Earnings</p>

                            <h2>
                                {loading
                                    ? "..."
                                    : formatCurrency(totalEarnings)}
                            </h2>

                        </div>

                    </div>

                </section>

                {/* ================= CONTENT GRID ================= */}

                <section className="dashboard-content-grid">

                    {/* ================= RECENT APPLICATIONS ================= */}

                    <div className="dashboard-section">

                        <div className="section-header">

                            <div>

                                <h2>
                                    Recent Applications
                                </h2>

                                <p>
                                    Track your latest applications
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    handleMenuClick("Applications")
                                }
                            >
                                View All →
                            </button>

                        </div>

                        <div className="application-list">

                            {applications.length === 0 ? (

                                <p>
                                    No applications yet.
                                </p>

                            ) : (

                                applications.map((application) => (

                                    <div
                                        className="application-item"
                                        key={application.applicationId}
                                    >

                                        <div className="application-icon">
                                            💼
                                        </div>

                                        <div className="application-info">

                                            <h3>
                                                {application.projectTitle ||
                                                    "Untitled Project"}
                                            </h3>

                                            <p>
                                                {application.clientName ||
                                                    "Client"}
                                            </p>

                                        </div>

                                        <div className="application-amount">
                                            {formatCurrency(
                                                application.proposedPrice
                                            )}
                                        </div>

                                        <div
                                            className={`application-status ${
                                                formatStatus(
                                                    application.applicationStatus
                                                )
                                                    .replace(/\s+/g, "-")
                                                    .toLowerCase()
                                            }`}
                                        >
                                            {formatStatus(
                                                application.applicationStatus
                                            )}
                                        </div>

                                    </div>

                                ))

                            )}

                        </div>

                    </div>

                    {/* ================= ACTIVE PROJECTS ================= */}

                    <div className="dashboard-section">

                        <div className="section-header">

                            <div>

                                <h2>
                                    Active Projects
                                </h2>

                                <p>
                                    Your ongoing work
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    handleMenuClick("Projects")
                                }
                            >
                                View All →
                            </button>

                        </div>

                        <div className="project-list">

                            {projects.length === 0 ? (

                                <p>
                                    No active projects currently.
                                </p>

                            ) : (

                                projects.map((project) => (

                                    <div
                                        className="project-item"
                                        key={project.gigId}
                                    >

                                        <div className="project-title-row">

                                            <div>

                                                <h3>
                                                    {project.title}
                                                </h3>

                                                <p>
                                                    Client:{" "}
                                                    {project.clientName ||
                                                        "Client"}
                                                </p>

                                            </div>

                                            <span className="project-status">
                                                {formatStatus(
                                                    project.status
                                                )}
                                            </span>

                                        </div>

                                        <div
                                            style={{
                                                marginTop: "10px",
                                                fontSize: "13px"
                                            }}
                                        >
                                            Deadline:{" "}
                                            {project.deadline ||
                                                "Not specified"}
                                            {" | "}
                                            Budget:{" "}
                                            {formatBudget(
                                                project.budgetMin,
                                                project.budgetMax
                                            )}
                                        </div>

                                    </div>

                                ))

                            )}

                        </div>

                    </div>

                </section>

                {/* ================= RECOMMENDED PROJECTS ================= */}

                <section className="recommended-section">

                    <div className="section-header">

                        <div>

                            <h2>
                                Recommended Projects
                            </h2>

                            <p>
                                Latest open projects available to you
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                handleMenuClick("Find Projects")
                            }
                        >
                            Browse All →
                        </button>

                    </div>

                    <div className="recommended-grid">

                        {recommendedProjects.length === 0 ? (

                            <p>
                                No open projects available currently.
                            </p>

                        ) : (

                            recommendedProjects.map((project) => (

                                <div
                                    className="recommended-card"
                                    key={project.gigId}
                                >

                                    <div className="recommended-top">

                                        <span className="project-category">
                                            Category{" "}
                                            {project.categoryId ?? "-"}
                                        </span>

                                        <span>
                                            {formatStatus(project.status)}
                                        </span>

                                    </div>

                                    <h3>
                                        {project.title}
                                    </h3>

                                    <p>
                                        {project.description ||
                                            "No project description provided."}
                                    </p>

                                    <div className="skills">

                                        {project.requiredExperience ? (

                                            <span>
                                                {
                                                    project.requiredExperience
                                                }
                                            </span>

                                        ) : (

                                            <span>
                                                Experience not specified
                                            </span>

                                        )}

                                    </div>

                                    <div className="recommended-bottom">

                                        <strong>
                                            {formatBudget(
                                                project.budgetMin,
                                                project.budgetMax
                                            )}
                                        </strong>

                                        <button
                                            onClick={() =>
                                                handleMenuClick(
                                                    "Find Projects"
                                                )
                                            }
                                        >
                                            View Project →
                                        </button>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </section>

            </main>

        </div>
    );
}

export default StudentDashboard;
