import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./BrowseProjects.css";

function BrowseProjects() {

    const navigate = useNavigate();

    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        api.get("/gigs/open")

            .then((response) => {

                console.log("Projects received:", response.data);

                setGigs(response.data);

                setLoading(false);
            })

            .catch((err) => {

                console.error("Project loading error:", err);

                setError(
                    "Unable to load projects. Please try again."
                );

                setLoading(false);
            });

    }, []);


    return (

        <div className="browse-projects-page">

            {/* HEADER */}

            <div className="browse-header">

                <div>

                    <h1>Find Projects</h1>

                    <p>
                        Find projects that match your skills and interests.
                    </p>

                </div>


                <button
                    className="back-button"
                    onClick={() => navigate("/student-dashboard")}
                >
                    ← Back to Dashboard
                </button>

            </div>


            {/* LOADING */}

            {loading && (

                <div className="message-box">

                    <p>
                        Loading projects...
                    </p>

                </div>

            )}


            {/* ERROR */}

            {error && (

                <div className="error-box">

                    <p>
                        {error}
                    </p>

                </div>

            )}


            {/* NO PROJECTS */}

            {!loading && !error && gigs.length === 0 && (

                <div className="message-box">

                    <h3>
                        No projects available
                    </h3>

                    <p>
                        There are currently no open projects.
                    </p>

                </div>

            )}


            {/* PROJECT CARDS */}

            {!loading && !error && gigs.length > 0 && (

                <div className="projects-grid">

                    {gigs.map((gig) => (

                        <div
                            className="project-card"
                            key={gig.gigId}
                        >

                            <div className="project-card-header">

                                <h2>
                                    {gig.title}
                                </h2>

                                <span className="status-badge">
                                    {gig.status}
                                </span>

                            </div>


                            <p className="project-description">

                                {gig.description ||
                                    "No description available."}

                            </p>


                            <div className="project-details">

                                <div className="detail-item">

                                    <span className="detail-label">
                                        Budget
                                    </span>

                                    <span className="detail-value">
                                        ₹{gig.budgetMin} - ₹{gig.budgetMax}
                                    </span>

                                </div>


                                <div className="detail-item">

                                    <span className="detail-label">
                                        Deadline
                                    </span>

                                    <span className="detail-value">

                                        {gig.deadline
                                            ? new Date(
                                                gig.deadline
                                            ).toLocaleDateString()
                                            : "Not specified"}

                                    </span>

                                </div>


                                <div className="detail-item">

                                    <span className="detail-label">
                                        Required Skills
                                    </span>

                                    <span className="detail-value">

                                        {gig.requiredExperience ||
                                            "Not specified"}

                                    </span>

                                </div>

                            </div>


                            <button
                                className="view-project-button"
                                onClick={() =>
                                    navigate(
                                        `/project/${gig.gigId}`
                                    )
                                }
                            >
                                View Project
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default BrowseProjects;