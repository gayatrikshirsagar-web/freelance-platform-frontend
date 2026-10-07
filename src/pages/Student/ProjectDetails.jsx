import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "./ProjectDetails.css";

function ProjectDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [isSaved, setIsSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    // Get logged-in user's role
    const role = localStorage.getItem("role");


    // =====================================================
    // CHECK WHETHER PROJECT IS ALREADY SAVED
    // Only STUDENT can save projects
    // =====================================================

    const checkIfSaved = async () => {

        const userId = localStorage.getItem("userId");
        const currentRole = localStorage.getItem("role");

        // Do not check favorites for clients
        if (!userId || currentRole !== "STUDENT") {
            return;
        }

        try {

            const response = await api.get(
                `/favorites/check/${userId}/${id}`
            );

            console.log(
                "Saved status:",
                response.data
            );

            setIsSaved(response.data);

        } catch (error) {

            console.error(
                "Error checking saved project:",
                error
            );
        }
    };


    // =====================================================
    // SAVE / REMOVE PROJECT
    // Only STUDENT can save projects
    // =====================================================

    const handleSaveProject = async () => {

        const userId = localStorage.getItem("userId");
        const currentRole = localStorage.getItem("role");

        // Clients cannot save projects
        if (currentRole !== "STUDENT") {
            return;
        }

        // User is not logged in
        if (!userId) {

            alert(
                "Please login before saving a project."
            );

            navigate("/login");

            return;
        }


        try {

            setSaving(true);


            // =================================================
            // SAVE PROJECT
            // =================================================

            if (!isSaved) {

                await api.post(
                    "/favorites",
                    {
                        userId: Number(userId),
                        gigId: Number(id)
                    }
                );

                setIsSaved(true);

                alert(
                    "Project saved successfully!"
                );

            }


            // =================================================
            // REMOVE PROJECT
            // =================================================

            else {

                await api.delete(
                    `/favorites/${userId}/${id}`
                );

                setIsSaved(false);

                alert(
                    "Project removed from saved projects."
                );
            }

        } catch (error) {

            console.error(
                "Save project error:",
                error
            );


            if (
                error.response &&
                error.response.data
            ) {

                alert(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : "Unable to save project."
                );

            } else {

                alert(
                    "Unable to save project."
                );
            }

        } finally {

            setSaving(false);
        }
    };


    // =====================================================
    // LOAD PROJECT + CHECK SAVED STATUS
    // =====================================================

    useEffect(() => {

        // Load project details
        api.get(`/gigs/${id}`)
            .then((response) => {

                console.log(
                    "Project:",
                    response.data
                );

                setProject(
                    response.data
                );

                setLoading(false);

            })
            .catch((error) => {

                console.error(
                    "Project loading error:",
                    error
                );

                setError(
                    "Unable to load project."
                );

                setLoading(false);
            });


        // Check saved status only for students
        checkIfSaved();

    }, [id]);


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="project-details-page">

                <div className="details-message">

                    <h2>
                        Loading project...
                    </h2>

                    <p>
                        Please wait while we load
                        the project details.
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

            <div className="project-details-page">

                <div className="details-error">

                    <h2>
                        Something went wrong
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            role === "CLIENT"
                                ? navigate("/client-applications")
                                : navigate("/find-projects")
                        }
                    >
                        ← Back
                    </button>

                </div>

            </div>
        );
    }


    // =====================================================
    // PROJECT NOT FOUND
    // =====================================================

    if (!project) {

        return (

            <div className="project-details-page">

                <div className="details-message">

                    <h2>
                        Project not found
                    </h2>

                    <button
                        onClick={() =>
                            role === "CLIENT"
                                ? navigate("/client-applications")
                                : navigate("/find-projects")
                        }
                    >
                        ← Back
                    </button>

                </div>

            </div>
        );
    }


    // =====================================================
    // MAIN PAGE
    // =====================================================

    return (

        <div className="project-details-page">


            {/* =================================================
                TOP BAR
            ================================================= */}

            <div className="details-topbar">

                <button
                    className="back-projects-button"
                    onClick={() =>
                        role === "CLIENT"
                            ? navigate("/client-applications")
                            : navigate("/find-projects")
                    }
                >
                    {role === "CLIENT"
                        ? "← Back to Applications"
                        : "← Back to Projects"}
                </button>

            </div>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div className="project-details-container">


                {/* =================================================
                    LEFT SIDE
                ================================================= */}

                <div className="project-main-card">


                    {/* TITLE */}

                    <div className="project-title-section">

                        <h1>
                            {project.title}
                        </h1>

                        <span className="project-status">
                            {project.status}
                        </span>

                    </div>


                    {/* DESCRIPTION */}

                    <div className="details-section">

                        <h2>
                            Project Description
                        </h2>

                        <p>
                            {project.description ||
                                "No description provided."}
                        </p>

                    </div>


                    {/* REQUIRED SKILLS */}

                    <div className="details-section">

                        <h2>
                            Required Skills / Experience
                        </h2>

                        <p>
                            {project.requiredExperience ||
                                "Not specified"}
                        </p>

                    </div>


                    {/* PROJECT INFORMATION */}

                    <div className="details-section">

                        <h2>
                            Project Information
                        </h2>


                        <div className="information-grid">


                            {/* BUDGET */}

                            <div className="information-item">

                                <span>
                                    Budget
                                </span>

                                <strong>
                                    ₹{project.budgetMin} - ₹
                                    {project.budgetMax}
                                </strong>

                            </div>


                            {/* DEADLINE */}

                            <div className="information-item">

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


                            {/* PROJECT ID */}

                            <div className="information-item">

                                <span>
                                    Project ID
                                </span>

                                <strong>
                                    #{project.gigId}
                                </strong>

                            </div>


                            {/* CLIENT ID */}

                            <div className="information-item">

                                <span>
                                    Client ID
                                </span>

                                <strong>
                                    {project.clientId}
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    RIGHT SIDE
                ================================================= */}

                <div className="project-side-card">


                    <h2>
                        Project Summary
                    </h2>


                    {/* STATUS */}

                    <div className="summary-item">

                        <span>
                            Status
                        </span>

                        <strong>
                            {project.status}
                        </strong>

                    </div>


                    {/* BUDGET */}

                    <div className="summary-item">

                        <span>
                            Budget
                        </span>

                        <strong>
                            ₹{project.budgetMin} - ₹
                            {project.budgetMax}
                        </strong>

                    </div>


                    {/* DEADLINE */}

                    <div className="summary-item">

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


                    {/* =================================================
                        APPLY BUTTON
                        Only visible to STUDENT
                    ================================================= */}

                    {role === "STUDENT" && (

                        <button
                            className="apply-button"
                            onClick={() =>
                                navigate(
                                    `/apply/${project.gigId}`
                                )
                            }
                        >
                            Apply Now
                        </button>

                    )}


                    {/* =================================================
                        SAVE BUTTON
                        Only visible to STUDENT
                    ================================================= */}

                    {role === "STUDENT" && (

                        <button
                            className="save-button"
                            onClick={handleSaveProject}
                            disabled={saving}
                        >

                            {saving
                                ? "Saving..."
                                : isSaved
                                    ? "♥ Saved"
                                    : "♡ Save Project"
                            }

                        </button>

                    )}


                    {/* =================================================
                        CLIENT MESSAGE
                    ================================================= */}

                    {role === "CLIENT" && (

                        <div className="client-project-message">

                            <p>
                                You are viewing this project
                                as a client.
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default ProjectDetails;