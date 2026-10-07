import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./MyProjects.css";


function MyProjects() {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const userId = localStorage.getItem("userId");
        const role = localStorage.getItem("role");

        if (!userId) {
            alert("Please login first.");
            navigate("/login");
            return;
        }

        if (role !== "CLIENT") {
            alert("Only clients can access My Projects.");
            navigate("/client-dashboard");
            return;
        }

        api.get(`/gigs/client/${userId}`)
            .then((response) => {

                console.log(
                    "Client projects:",
                    response.data
                );

                setProjects(response.data);
                setLoading(false);
            })
            .catch((error) => {

                console.error(
                    "Project loading error:",
                    error
                );

                setError(
                    "Unable to load your projects."
                );

                setLoading(false);
            });

    }, [navigate]);

    const handleViewProject = (gigId) => {
        navigate(`/project/${gigId}`);
    };

    const handlePostProject = () => {
        navigate("/post-project");
    };

    const handleBackToDashboard = () => {
        navigate("/client-dashboard");
    };

    return (
        <div className="my-projects-page">

            {/* HEADER */}

            <header className="my-projects-header">

                <div>
                    <h1>My Projects</h1>

                    <p>
                        Manage the projects you have posted.
                    </p>
                </div>

                <div className="my-projects-header-actions">

                    <button
                        className="my-projects-back-button"
                        onClick={handleBackToDashboard}
                    >
                        ← Dashboard
                    </button>

                    <button
                        className="my-projects-post-button"
                        onClick={handlePostProject}
                    >
                        + Post a Project
                    </button>

                </div>

            </header>


            {/* MAIN CONTENT */}

            <main className="my-projects-content">

                {loading && (
                    <div className="my-projects-message">
                        Loading your projects...
                    </div>
                )}


                {!loading && error && (
                    <div className="my-projects-message error">
                        {error}
                    </div>
                )}


                {!loading &&
                    !error &&
                    projects.length === 0 && (

                        <div className="my-projects-empty">

                            <div className="empty-project-icon">
                                📁
                            </div>

                            <h2>
                                No Projects Yet
                            </h2>

                            <p>
                                You haven't posted any
                                projects yet.
                            </p>

                            <button
                                onClick={handlePostProject}
                            >
                                + Post Your First Project
                            </button>

                        </div>
                    )}


                {!loading &&
                    !error &&
                    projects.length > 0 && (

                        <div className="my-projects-grid">

                            {projects.map((project) => (

                                <div
                                    className="my-project-card"
                                    key={project.gigId}
                                >

                                    <div className="my-project-card-top">

                                        <span
                                            className={
                                                project.status === "OPEN"
                                                    ? "project-status open"
                                                    : project.status === "IN_PROGRESS"
                                                    ? "project-status progress"
                                                    : project.status === "COMPLETED"
                                                    ? "project-status completed"
                                                    : "project-status closed"
                                            }
                                        >
                                            {project.status}
                                        </span>

                                        <span className="project-id">
                                            #{project.gigId}
                                        </span>

                                    </div>


                                    <h2>
                                        {project.title}
                                    </h2>


                                    <p className="project-description">

                                        {project.description ||
                                            "No description provided."}

                                    </p>


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
                                                {project.deadline || "Not specified"}
                                            </strong>

                                        </div>


                                        <div className="project-detail">

                                            <span className="detail-label">
                                                Experience
                                            </span>

                                            <strong>
                                                {project.requiredExperience ||
                                                    "Not specified"}
                                            </strong>

                                        </div>

                                    </div>


                                    <div className="my-project-card-footer">

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

export default MyProjects;