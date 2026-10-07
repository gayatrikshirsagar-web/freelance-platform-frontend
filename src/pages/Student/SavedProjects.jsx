import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./SavedProjects.css";

function SavedProjects() {

    const navigate = useNavigate();

    const [savedProjects, setSavedProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =====================================================
    // LOAD SAVED PROJECTS
    // =====================================================

    useEffect(() => {

        const loadSavedProjects = async () => {

            const userId = localStorage.getItem("userId");

            // -------------------------------------------------
            // Check login
            // -------------------------------------------------

            if (!userId) {

                alert(
                    "Please login to view your saved projects."
                );

                navigate("/login");

                return;
            }

            try {

                // -------------------------------------------------
                // Get saved projects
                // -------------------------------------------------

                const response = await api.get(
                    `/favorites/student/${userId}`
                );

                console.log(
                    "Saved projects:",
                    response.data
                );


                const favorites = response.data;


                // -------------------------------------------------
                // Get complete gig details
                // -------------------------------------------------

                const projectDetails =
                    await Promise.all(

                        favorites.map(async (favorite) => {

                            try {

                                const gigResponse =
                                    await api.get(
                                        `/gigs/${favorite.gigId}`
                                    );

                                return {
                                    ...favorite,
                                    project: gigResponse.data
                                };

                            } catch (error) {

                                console.error(
                                    `Error loading project ${favorite.gigId}:`,
                                    error
                                );

                                return {
                                    ...favorite,
                                    project: null
                                };
                            }
                        })
                    );


                // -------------------------------------------------
                // Remove projects that no longer exist
                // -------------------------------------------------

                const validProjects =
                    projectDetails.filter(
                        (item) => item.project !== null
                    );


                setSavedProjects(
                    validProjects
                );

                setLoading(false);

            } catch (error) {

                console.error(
                    "Error loading saved projects:",
                    error
                );

                setError(
                    "Unable to load saved projects."
                );

                setLoading(false);
            }
        };


        loadSavedProjects();

    }, [navigate]);


    // =====================================================
    // REMOVE SAVED PROJECT
    // =====================================================

    const handleRemoveSavedProject = async (
        gigId
    ) => {

        const userId =
            localStorage.getItem("userId");


        if (!userId) {

            alert(
                "Please login first."
            );

            navigate("/login");

            return;
        }


        try {

            await api.delete(
                `/favorites/${userId}/${gigId}`
            );


            // Remove from UI immediately
            setSavedProjects(
                (previousProjects) =>
                    previousProjects.filter(
                        (item) =>
                            item.gigId !== gigId
                    )
            );


            alert(
                "Project removed from saved projects."
            );

        } catch (error) {

            console.error(
                "Remove saved project error:",
                error
            );

            alert(
                "Unable to remove saved project."
            );
        }
    };


    // =====================================================
    // VIEW PROJECT
    // =====================================================

    const handleViewProject = (
        gigId
    ) => {

        navigate(
            `/project/${gigId}`
        );
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="saved-projects-page">

                <div className="saved-message">

                    <h2>
                        Loading saved projects...
                    </h2>

                    <p>
                        Please wait while we load
                        your saved projects.
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <div className="saved-projects-page">

                <div className="saved-error">

                    <h2>
                        Something went wrong
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            navigate(
                                "/student-dashboard"
                            )
                        }
                    >
                        ← Back to Dashboard
                    </button>

                </div>

            </div>
        );
    }


    // =====================================================
    // MAIN PAGE
    // =====================================================

    return (

        <div className="saved-projects-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="saved-projects-header">

                <div>

                    <h1>
                        Saved Projects
                    </h1>

                    <p>
                        View and manage the projects
                        you have saved.
                    </p>

                </div>


                <button
                    className="back-dashboard-button"
                    onClick={() =>
                        navigate(
                            "/student-dashboard"
                        )
                    }
                >
                    ← Back to Dashboard
                </button>

            </div>


            {/* =================================================
                NO SAVED PROJECTS
            ================================================= */}

            {savedProjects.length === 0 && (

                <div className="no-saved-projects">

                    <div className="saved-empty-icon">
                        ♡
                    </div>

                    <h2>
                        No Saved Projects
                    </h2>

                    <p>
                        You haven't saved any projects yet.
                    </p>

                    <button
                        className="browse-projects-button"
                        onClick={() =>
                            navigate(
                                "/find-projects"
                            )
                        }
                    >
                        Browse Projects
                    </button>

                </div>
            )}


            {/* =================================================
                SAVED PROJECTS
            ================================================= */}

            {savedProjects.length > 0 && (

                <div className="saved-projects-container">


                    {/* COUNT */}

                    <div className="saved-projects-count">

                        <strong>
                            {savedProjects.length}
                        </strong>

                        <span>
                            {savedProjects.length === 1
                                ? " Saved Project"
                                : " Saved Projects"}
                        </span>

                    </div>


                    {/* PROJECT GRID */}

                    <div className="saved-projects-grid">

                        {savedProjects.map(
                            (item) => {

                                const project =
                                    item.project;

                                return (

                                    <div
                                        className="saved-project-card"
                                        key={`${item.gigId}`}
                                    >


                                        {/* =========================
                                            HEADER
                                        ========================= */}

                                        <div className="saved-card-header">

                                            <div>

                                                <h2>
                                                    {project.title}
                                                </h2>

                                                <span className="saved-status">

                                                    {project.status}

                                                </span>

                                            </div>

                                        </div>


                                        {/* =========================
                                            DESCRIPTION
                                        ========================= */}

                                        <p className="saved-description">

                                            {project.description ||
                                                "No description available."}

                                        </p>


                                        {/* =========================
                                            PROJECT INFORMATION
                                        ========================= */}

                                        <div className="saved-project-details">


                                            {/* BUDGET */}

                                            <div className="saved-detail">

                                                <span>
                                                    Budget
                                                </span>

                                                <strong>

                                                    ₹
                                                    {project.budgetMin}
                                                    {" - "}
                                                    ₹
                                                    {project.budgetMax}

                                                </strong>

                                            </div>


                                            {/* DEADLINE */}

                                            <div className="saved-detail">

                                                <span>
                                                    Deadline
                                                </span>

                                                <strong>

                                                    {project.deadline
                                                        ? new Date(
                                                            project.deadline
                                                        ).toLocaleDateString()
                                                        : "Not specified"}

                                                </strong>

                                            </div>


                                            {/* SKILLS */}

                                            <div className="saved-detail">

                                                <span>
                                                    Required Skills
                                                </span>

                                                <strong>

                                                    {project.requiredExperience ||
                                                        "Not specified"}

                                                </strong>

                                            </div>

                                        </div>


                                        {/* =========================
                                            SAVED DATE
                                        ========================= */}

                                        <div className="saved-date">

                                            Saved on:{" "}

                                            {item.savedAt
                                                ? new Date(
                                                    item.savedAt
                                                ).toLocaleDateString()
                                                : "Not available"}

                                        </div>


                                        {/* =========================
                                            BUTTONS
                                        ========================= */}

                                        <div className="saved-card-buttons">

                                            <button
                                                className="view-saved-button"
                                                onClick={() =>
                                                    handleViewProject(
                                                        project.gigId
                                                    )
                                                }
                                            >
                                                View Project
                                            </button>


                                            <button
                                                className="remove-saved-button"
                                                onClick={() =>
                                                    handleRemoveSavedProject(
                                                        project.gigId
                                                    )
                                                }
                                            >
                                                ♥ Remove
                                            </button>

                                        </div>

                                    </div>
                                );
                            }
                        )}

                    </div>

                </div>
            )}

        </div>
    );
}

export default SavedProjects;