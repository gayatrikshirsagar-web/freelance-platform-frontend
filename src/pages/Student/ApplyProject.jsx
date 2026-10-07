import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "./ApplyProject.css";

function ApplyProject() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);

    const [coverLetter, setCoverLetter] = useState("");
    const [proposedPrice, setProposedPrice] = useState("");
    const [estimatedDays, setEstimatedDays] = useState("");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Load project details
    useEffect(() => {

        api.get(`/gigs/${id}`)
            .then((response) => {

                console.log("Project:", response.data);

                setProject(response.data);
                setLoading(false);
            })
            .catch((error) => {

                console.error("Project loading error:", error);

                setError("Unable to load project.");
                setLoading(false);
            });

    }, [id]);


    // Submit application
    const handleSubmit = async (event) => {

        event.preventDefault();

        // Get logged-in user's ID
        const userId = localStorage.getItem("userId");

        if (!userId) {

            alert("Please login before applying.");

            navigate("/login");

            return;
        }


        // Validation
        if (!coverLetter.trim()) {

            alert("Please enter your cover letter.");

            return;
        }


        if (!proposedPrice) {

            alert("Please enter your proposed price.");

            return;
        }


        if (!estimatedDays) {

            alert("Please enter estimated completion days.");

            return;
        }


        // Data sent to backend
        const applicationData = {

            gigId: Number(id),

            userId: Number(userId),

            coverLetter: coverLetter,

            proposedPrice: Number(proposedPrice),

            estimatedDays: Number(estimatedDays)
        };


        console.log("Application data:", applicationData);


        try {

            setSubmitting(true);

            await api.post(
                "/applications",
                applicationData
            );


            alert("Application submitted successfully!");

            navigate("/my-applications");

        } catch (error) {

            console.error(
                "Application submission error:",
                error
            );


            if (
                error.response &&
                error.response.data
            ) {

                alert(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : "Unable to submit application."
                );

            } else {

                alert("Unable to submit application.");

            }

        } finally {

            setSubmitting(false);

        }
    };


    // Loading screen
    if (loading) {

        return (
            <div className="apply-page">

                <div className="apply-message">

                    <h2>Loading project...</h2>

                </div>

            </div>
        );
    }


    // Error screen
    if (error || !project) {

        return (
            <div className="apply-page">

                <div className="apply-message">

                    <h2>Something went wrong</h2>

                    <p>{error}</p>

                    <button
                        onClick={() =>
                            navigate("/find-projects")
                        }
                    >
                        ← Back to Projects
                    </button>

                </div>

            </div>
        );
    }


    return (

        <div className="apply-page">

            <div className="apply-container">

                {/* Back button */}

                <button
                    className="back-button"
                    onClick={() =>
                        navigate(`/project/${id}`)
                    }
                >
                    ← Back to Project
                </button>


                <div className="apply-card">

                    <h1>Apply for Project</h1>


                    {/* Project information */}

                    <div className="project-summary">

                        <h2>{project.title}</h2>

                        <p>
                            {project.description ||
                                "No description available."}
                        </p>


                        <div className="summary-details">

                            <span>
                                <strong>Budget:</strong>{" "}
                                ₹{project.budgetMin} - ₹
                                {project.budgetMax}
                            </span>

                            <span>
                                <strong>Deadline:</strong>{" "}
                                {project.deadline ||
                                    "Not specified"}
                            </span>

                        </div>

                    </div>


                    {/* Application form */}

                    <form onSubmit={handleSubmit}>

                        {/* Cover letter */}

                        <div className="form-group">

                            <label>
                                Cover Letter
                            </label>

                            <textarea
                                value={coverLetter}
                                onChange={(event) =>
                                    setCoverLetter(
                                        event.target.value
                                    )
                                }
                                placeholder="Explain why you are suitable for this project..."
                                rows="7"
                            />

                        </div>


                        {/* Proposed price */}

                        <div className="form-group">

                            <label>
                                Proposed Price (₹)
                            </label>

                            <input
                                type="number"
                                value={proposedPrice}
                                onChange={(event) =>
                                    setProposedPrice(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter your proposed price"
                            />

                        </div>


                        {/* Estimated days */}

                        <div className="form-group">

                            <label>
                                Estimated Completion Days
                            </label>

                            <input
                                type="number"
                                value={estimatedDays}
                                onChange={(event) =>
                                    setEstimatedDays(
                                        event.target.value
                                    )
                                }
                                placeholder="Example: 10"
                            />

                        </div>


                        {/* Submit */}

                        <button
                            type="submit"
                            className="submit-application-button"
                            disabled={submitting}
                        >

                            {submitting
                                ? "Submitting..."
                                : "Submit Application"}

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default ApplyProject;