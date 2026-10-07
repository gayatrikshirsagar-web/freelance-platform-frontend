import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./ActiveProjects.css";

function ActiveProjects() {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const userId = localStorage.getItem("userId");
        const role = localStorage.getItem("role");

        // Check login
        if (!userId) {
            alert("Please login first.");
            navigate("/login");
            return;
        }

        // Only students can access this page
        if (role !== "STUDENT") {
            alert("Only students can access Active Projects.");
            navigate("/student-dashboard");
            return;
        }

        // Get student's active projects
        api.get(`/gigs/student/${userId}`)
            .then((response) => {

                console.log(
                    "Student active projects:",
                    response.data
                );

                setProjects(response.data);
                setLoading(false);
            })
            .catch((error) => {

                console.error(
                    "Active projects loading error:",
                    error
                );

                setError(
                    "Unable to load your active projects."
                );

                setLoading(false);
            });

    }, [navigate]);

    // View project details
    const handleViewProject = (gigId) => {
        navigate(`/project/${gigId}`);
    };

    // Back to dashboard
    const handleBackToDashboard = () => {
        navigate("/student-dashboard");
    };

    return (
        <div className="active-projects-page">

            {/* HEADER */}
            <header className="active-projects-header">

                <div>
                    <h1>Active Projects</h1>

                    <p>
                        Projects you are currently working on.
                    </p>
                </div>

                <button
                    className="active-projects-back-button"
                    onClick={handleBackToDashboard}
                >
                    ← Dashboard
                </button>

            </header>


            {/* CONTENT */}
            <main className="active-projects-content">

                {/* LOADING */}
                {loading && (
                    <div className="active-projects-message">
                        Loading your active projects...
                    </div>
                )}


                {/* ERROR */}
                {!loading && error && (
                    <div className="active-projects-message error">
                        {error}
                    </div>
                )}


                {/* NO PROJECTS */}
                {!loading &&
                    !error &&
                    projects.length === 0 && (

                        <div className="active-projects-empty">

                            <div className="empty-project-icon">
                                💼
                            </div>

                            <h2>
                                No Active Projects
                            </h2>

                            <p>
                                You don't have any active projects
                                assigned to you yet.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/find-projects")
                                }
                            >
                                Browse Projects
                            </button>

                        </div>
                    )}


                {/* PROJECTS */}
                {!loading &&
                    !error &&
                    projects.length > 0 && (

                        <div className="active-projects-grid">

                            {projects.map((project) => (

                                <div
                                    className="active-project-card"
                                    key={project.gigId}
                                >

                                    {/* CARD TOP */}
                                    <div className="active-project-card-top">

                                        <span className="project-status">
                                            {project.status === "IN_PROGRESS"
                                                ? "IN PROGRESS"
                                                : project.status}
                                        </span>

                                        <span className="project-id">
                                            #{project.gigId}
                                        </span>

                                    </div>


                                    {/* TITLE */}
                                    <h2>
                                        {project.title}
                                    </h2>


                                    {/* DESCRIPTION */}
                                    <p className="project-description">

                                        {project.description ||
                                            "No description provided."}

                                    </p>


                                    {/* DETAILS */}
                                    <div className="project-details">

                                        <div className="project-detail">

                                            <span className="detail-label">
                                                Budget
                                            </span>

                                            <strong>

                                                ₹
                                                {Number(
                                                    project.budgetMin || 0
                                                ).toLocaleString("en-IN")}

                                                {" - "}

                                                ₹
                                                {Number(
                                                    project.budgetMax || 0
                                                ).toLocaleString("en-IN")}

                                            </strong>

                                        </div>


                                        <div className="project-detail">

                                            <span className="detail-label">
                                                Deadline
                                            </span>

                                            <strong>
                                                {project.deadline ||
                                                    "Not specified"}
                                            </strong>

                                        </div>


                                        <div className="project-detail">

                                            <span className="detail-label">
                                                Required Experience
                                            </span>

                                            <strong>
                                                {project.requiredExperience ||
                                                    "Not specified"}
                                            </strong>

                                        </div>

                                    </div>


                                    {/* FOOTER */}
                                    <div className="active-project-card-footer">

                                        <button
                                            className="view-project-button"
                                            onClick={() =>
                                                handleViewProject(
                                                    project.gigId
                                                )
                                            }
                                        >
                                            View Project
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>
                    )}

            </main>

        </div>
    );
}

export default ActiveProjects;