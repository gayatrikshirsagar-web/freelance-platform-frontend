import { useEffect, useState } from "react";
import DashboardActions from "../pages/DashboardActions";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./ClientDashboard.css";

function ClientDashboard() {

    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState("Dashboard");

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    /*
     * GET LOGGED-IN USER ID
     */
    const userId = localStorage.getItem("userId");


    /*
     * LOAD CLIENT DASHBOARD
     */
    useEffect(() => {

        if (!userId) {
            navigate("/login");
            return;
        }

        loadDashboard();

    }, [userId]);


    const loadDashboard = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                `/client-dashboard/${userId}`
            );

            setDashboard(response.data);

        } catch (err) {

            console.error(
                "Error loading client dashboard:",
                err
            );

            setError(
                "Unable to load dashboard data."
            );

        } finally {

            setLoading(false);
        }
    };


    /*
     * LOGOUT
     */
    const handleLogout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("name");

        navigate("/login");
    };


    /*
     * SIDEBAR MENU HANDLER
     */
    const handleMenuClick = (menu) => {

        setActiveMenu(menu);

        if (menu === "Dashboard") {
            navigate("/client-dashboard");
        }

        if (menu === "Post Project") {
            navigate("/post-project");
        }

        if (menu === "Projects") {
            navigate("/my-projects");
        }

        if (menu === "Applications") {
            navigate("/client-applications");
        }

        if (menu === "Freelancers") {
            setActiveMenu("Freelancers");
        }

        if (menu === "Messages") {
            navigate("/messages");
        }

        if (menu === "Notifications") {
            navigate("/notifications");
        }

        if (menu === "Profile") {
            navigate("/client-profile");
        }
    };


    /*
     * OPEN APPLICATIONS PAGE
     */
    const handleViewApplications = () => {

        navigate("/client-applications");
    };


    /*
     * LOADING
     */
    if (loading) {

        return (
            <div className="client-dashboard">

                <aside className="client-sidebar">

                    <div className="client-logo">
                        Freelance<span>Hub</span>
                    </div>

                </aside>

                <main className="client-main">

                    <h2>Loading dashboard...</h2>

                </main>
                  <DashboardActions
    role="CLIENT"
    showBack={false}
/>
            </div>
        );
    }


    /*
     * ERROR
     */
    if (error || !dashboard) {

        return (
            <div className="client-dashboard">

                <aside className="client-sidebar">

                    <div className="client-logo">
                        Freelance<span>Hub</span>
                    </div>

                </aside>

                <main className="client-main">

                    <h2>
                        {error || "Dashboard data not found."}
                    </h2>

                    <button
                        onClick={loadDashboard}
                    >
                        Retry
                    </button>

                </main>

            </div>
        );
    }


    return (

        <div className="client-dashboard">


            {/* ================= SIDEBAR ================= */}

            <aside className="client-sidebar">


                <div className="client-logo">
                    Freelance<span>Hub</span>
                </div>


                {/* CLIENT PROFILE */}

                <div className="client-profile">

                    <div className="client-avatar">

                        {dashboard.clientName
                            ?.charAt(0)
                            ?.toUpperCase()}

                    </div>

                    <div>

                        <h4>
                            {dashboard.clientName}
                        </h4>

                        <p>
                            {dashboard.companyName ||
                                "Client"}
                        </p>

                    </div>
                      <DashboardActions
    role="CLIENT"
    showBack={false}
/>

                </div>


                {/* MENU */}

                <nav className="client-menu">


                    {/* DASHBOARD */}

                    <button
                        className={
                            activeMenu === "Dashboard"
                                ? "client-menu-item active"
                                : "client-menu-item"
                        }
                        onClick={() =>
                            handleMenuClick("Dashboard")
                        }
                    >
                        🏠 Dashboard
                    </button>


                    {/* POST PROJECT */}

                    <button
                        className={
                            activeMenu === "Post Project"
                                ? "client-menu-item active"
                                : "client-menu-item"
                        }
                        onClick={() =>
                            handleMenuClick("Post Project")
                        }
                    >
                        ➕ Post a Project
                    </button>


                    {/* MY PROJECTS */}

                    <button
                        className={
                            activeMenu === "Projects"
                                ? "client-menu-item active"
                                : "client-menu-item"
                        }
                        onClick={() =>
                            handleMenuClick("Projects")
                        }
                    >
                        📁 My Projects
                    </button>


                    {/* APPLICATIONS */}

                    <button
                        className={
                            activeMenu === "Applications"
                                ? "client-menu-item active"
                                : "client-menu-item"
                        }
                        onClick={() =>
                            handleMenuClick("Applications")
                        }
                    >
                        👥 Applications
                    </button>


                    {/* FIND FREELANCERS */}

                    <button
                        className={
                            activeMenu === "Freelancers"
                                ? "client-menu-item active"
                                : "client-menu-item"
                        }
                        onClick={() =>
                            handleMenuClick("Freelancers")
                        }
                    >
                        🔍 Find Freelancers
                    </button>


                    {/* MESSAGES */}

                    <button
                        className={
                            activeMenu === "Messages"
                                ? "client-menu-item active"
                                : "client-menu-item"
                        }
                        onClick={() =>
                            handleMenuClick("Messages")
                        }
                    >
                        💬 Messages
                    </button>


                    {/* NOTIFICATIONS */}

                    <button
                        className={
                            activeMenu === "Notifications"
                                ? "client-menu-item active"
                                : "client-menu-item"
                        }
                        onClick={() =>
                            handleMenuClick("Notifications")
                        }
                    >
                        🔔 Notifications
                    </button>


                    {/* COMPANY PROFILE */}

                    <button
                        className={
                            activeMenu === "Profile"
                                ? "client-menu-item active"
                                : "client-menu-item"
                        }
                        onClick={() =>
                            handleMenuClick("Profile")
                        }
                    >
                        👤 Company Profile
                    </button>

                </nav>


                {/* LOGOUT */}

                <button
                    className="client-logout"
                    onClick={handleLogout}
                >
                    🚪 Logout
                </button>

            </aside>


            {/* ================= MAIN ================= */}

            <main className="client-main">


                {/* ================= TOP BAR ================= */}

                <header className="client-topbar">

                    <div>

                        <h1>
                            Welcome back,{" "}
                            {dashboard.clientName}! 👋
                        </h1>

                        <p>
                            Manage your projects and connect with talented freelancers.
                        </p>

                    </div>


                    <div className="client-top-actions">

                        <button
                            className="client-notification"
                            onClick={() =>
                                navigate("/notifications")
                            }
                        >
                            🔔

                            {dashboard.unreadNotifications > 0 && (

                                <span>
                                    {dashboard.unreadNotifications}
                                </span>

                            )}

                        </button>


                        <div className="client-top-avatar">

                            {dashboard.clientName
                                ?.charAt(0)
                                ?.toUpperCase()}

                        </div>

                    </div>

                </header>


                {/* ================= QUICK ACTION ================= */}

                <section className="client-quick-action">

                    <div>

                        <h2>
                            Have a project in mind?
                        </h2>

                        <p>
                            Post your project and find the perfect freelancer.
                        </p>

                    </div>


                    <button
                        onClick={() =>
                            handleMenuClick("Post Project")
                        }
                    >
                        + Post a Project
                    </button>

                </section>


                {/* ================= STATISTICS ================= */}

                <section className="client-stats">


                    {/* ACTIVE PROJECTS */}

                    <div className="client-stat-card">

                        <div className="client-stat-icon purple">
                            📁
                        </div>

                        <div>

                            <p>
                                Active Projects
                            </p>

                            <h2>
                                {dashboard.activeProjects}
                            </h2>

                        </div>

                    </div>


                    {/* POSTED PROJECTS */}

                    <div className="client-stat-card">

                        <div className="client-stat-icon blue">
                            📄
                        </div>

                        <div>

                            <p>
                                Posted Projects
                            </p>

                            <h2>
                                {dashboard.postedProjects}
                            </h2>

                        </div>

                    </div>


                    {/* APPLICATIONS */}

                    <div className="client-stat-card">

                        <div className="client-stat-icon orange">
                            👥
                        </div>

                        <div>

                            <p>
                                Applications
                            </p>

                            <h2>
                                {dashboard.applications}
                            </h2>

                        </div>

                    </div>


                    {/* TOTAL SPENT */}

                    <div className="client-stat-card">

                        <div className="client-stat-icon green">
                            💰
                        </div>

                        <div>

                            <p>
                                Total Spent
                            </p>

                            <h2>
                                ₹{dashboard.totalSpent || 0}
                            </h2>

                        </div>

                    </div>

                </section>


                {/* ================= CONTENT ================= */}

                <section className="client-content-grid">


                    {/* ================= ACTIVE PROJECTS ================= */}

                    <div className="client-section">

                        <div className="client-section-header">

                            <div>

                                <h2>
                                    Active Projects
                                </h2>

                                <p>
                                    Track your ongoing projects
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


                        <div className="client-project-list">

                            {dashboard.activeProjectList?.length > 0 ? (

                                dashboard.activeProjectList.map(
                                    (project) => (

                                        <div
                                            className="client-project"
                                            key={project.gigId}
                                        >

                                            <div className="client-project-top">

                                                <div>

                                                    <h3>
                                                        {project.title}
                                                    </h3>

                                                    <p>
                                                        Freelancer:{" "}
                                                        {project.freelancerName ||
                                                            "Not assigned"}
                                                    </p>

                                                </div>

                                                <strong>
                                                    ₹
                                                    {project.budgetMax || 0}
                                                </strong>

                                            </div>


                                            {/* STATUS */}

                                            <div className="client-project-progress">

                                                <div className="client-progress-bar">

                                                    <div
                                                        className="client-progress-fill"
                                                        style={{
                                                            width:
                                                                project.status ===
                                                                "COMPLETED"
                                                                    ? "100%"
                                                                    : "50%"
                                                        }}
                                                    >
                                                    </div>

                                                </div>

                                                <span>
                                                    {project.status}
                                                </span>

                                            </div>


                                            <small>
                                                Deadline:{" "}
                                                {project.deadline ||
                                                    "Not specified"}
                                            </small>

                                        </div>

                                    )
                                )

                            ) : (

                                <p>
                                    No active projects yet.
                                </p>

                            )}

                        </div>

                    </div>


                    {/* ================= RECENT APPLICATIONS ================= */}

                    <div className="client-section">

                        <div className="client-section-header">

                            <div>

                                <h2>
                                    Recent Applications
                                </h2>

                                <p>
                                    Freelancers applying to your projects
                                </p>

                            </div>


                            <button
                                onClick={
                                    handleViewApplications
                                }
                            >
                                View All →
                            </button>

                        </div>


                        <div className="client-application-list">

                            {dashboard.recentApplications?.length > 0 ? (

                                dashboard.recentApplications.map(
                                    (application) => (

                                        <div
                                            className="client-application"
                                            key={application.applicationId}
                                        >

                                            <div className="freelancer-avatar">

                                                {application.freelancerName
                                                    ?.charAt(0)
                                                    ?.toUpperCase()}

                                            </div>


                                            <div className="freelancer-info">

                                                <h3>
                                                    {application.freelancerName}
                                                </h3>

                                                <p>
                                                    {application.projectTitle}
                                                </p>

                                                <span>
                                                    {application.course ||
                                                        "Freelancer"}
                                                </span>

                                            </div>


                                            <div className="freelancer-bid">

                                                <strong>
                                                    ₹
                                                    {application.bidAmount ||
                                                        0}
                                                </strong>


                                                <button
                                                    onClick={
                                                        handleViewApplications
                                                    }
                                                >
                                                    View
                                                </button>

                                            </div>

                                        </div>

                                    )
                                )

                            ) : (

                                <p>
                                    No applications yet.
                                </p>

                            )}

                        </div>

                    </div>

                </section>


                {/* ================= FIND FREELANCERS ================= */}

                <section className="freelancer-section">


                    <div className="client-section-header">

                        <div>

                            <h2>
                                Available Freelancers
                            </h2>

                            <p>
                                Freelancers currently available on the platform
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                handleMenuClick("Freelancers")
                            }
                        >
                            Find More →
                        </button>

                    </div>


                    <div className="freelancer-grid">


                        {dashboard.recommendedFreelancers?.length > 0 ? (

                            dashboard.recommendedFreelancers.map(
                                (freelancer) => (

                                    <div
                                        className="freelancer-card"
                                        key={freelancer.studentId}
                                    >

                                        <div className="freelancer-card-avatar">

                                            {freelancer.name
                                                ?.charAt(0)
                                                ?.toUpperCase()}

                                        </div>


                                        <h3>
                                            {freelancer.name}
                                        </h3>


                                        <p>
                                            {freelancer.course ||
                                                "Freelancer"}
                                        </p>


                                        <div className="freelancer-rating">

                                            📍{" "}
                                            {freelancer.location ||
                                                "Location not specified"}

                                        </div>


                                        <div className="freelancer-skills">

                                            <span>
                                                {freelancer.availabilityStatus ||
                                                    "AVAILABLE"}
                                            </span>

                                            {freelancer.hourlyRate && (

                                                <span>
                                                    ₹
                                                    {freelancer.hourlyRate}/hr
                                                </span>

                                            )}

                                        </div>


                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/student-public-profile/${freelancer.userId}`
                                                )
                                            }
                                        >
                                            View Profile
                                        </button>

                                    </div>

                                )
                            )

                        ) : (

                            <p>
                                No freelancers available currently.
                            </p>

                        )}

                    </div>

                </section>


            </main>

        </div>
    );
}

export default ClientDashboard;