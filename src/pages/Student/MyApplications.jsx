import { useEffect, useState } from "react";
import DashboardActions from "../../pages/DashboardActions";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./MyApplications.css";

function MyApplications() {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =====================================================
    // LOAD MY APPLICATIONS
    // =====================================================

    useEffect(() => {

        const loadApplications = async () => {

            const userId = localStorage.getItem("userId");

            // User not logged in
            if (!userId) {

                alert(
                    "Please login to view your applications."
                );

                navigate("/login");

                return;
            }


            try {

                // -------------------------------------------------
                // First get the student's profile
                // -------------------------------------------------

                const studentResponse =
                    await api.get(
                        `/student-dashboard/${userId}`
                    );


                const studentId =
                    studentResponse.data.studentId;


                console.log(
                    "Student ID:",
                    studentId
                );


                // -------------------------------------------------
                // Get applications using studentId
                // -------------------------------------------------

                const applicationResponse =
                    await api.get(
                        `/applications/student/${studentId}`
                    );


                console.log(
                    "Applications:",
                    applicationResponse.data
                );


                setApplications(
                    applicationResponse.data
                );

                setLoading(false);

            } catch (error) {

                console.error(
                    "Error loading applications:",
                    error
                );

                setError(
                    "Unable to load your applications."
                );

                setLoading(false);
            }
        };


        loadApplications();

    }, [navigate]);


    // =====================================================
    // VIEW PROJECT
    // =====================================================

    const handleViewProject = (gigId) => {

        navigate(`/project/${gigId}`);

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="my-applications-page">

                <div className="applications-message">

                    <h2>
                        Loading applications...
                    </h2>

                    <p>
                        Please wait while we load
                        your applications.
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

            <div className="my-applications-page">

                <div className="applications-error">

                    <h2>
                        Something went wrong
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            navigate("/student-dashboard")
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

        <div className="my-applications-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="applications-header">

                <div>

                    <h1>
                        My Applications
                    </h1>

                    <p>
                        Track the projects you have applied for.
                    </p>
                      <DashboardActions role="STUDENT" />
                </div>


              

            </div>


            {/* =================================================
                NO APPLICATIONS
            ================================================= */}

            {applications.length === 0 && (

                <div className="no-applications">

                    <div className="empty-icon">
                        📋
                    </div>

                    <h2>
                        No Applications Yet
                    </h2>

                    <p>
                        You haven't applied to any projects yet.
                    </p>

                    <button
                        className="browse-projects-button"
                        onClick={() =>
                            navigate("/find-projects")
                        }
                    >
                        Browse Projects
                    </button>

                </div>
            )}


            {/* =================================================
                APPLICATION LIST
            ================================================= */}

            {applications.length > 0 && (

                <div className="applications-container">

                    <div className="applications-count">

                        <strong>
                            {applications.length}
                        </strong>

                        <span>
                            {applications.length === 1
                                ? " Application"
                                : " Applications"}
                        </span>

                    </div>


                    <div className="applications-grid">

                        {applications.map(
                            (application) => (

                                <div
                                    className="application-card"
                                    key={
                                        application.applicationId
                                    }
                                >


                                    {/* =========================
                                        CARD HEADER
                                    ========================= */}

                                    <div className="application-card-header">

                                        <div>

                                            <h2>
                                                Project #
                                                {application.gigId}
                                            </h2>

                                            <p>
                                                Application ID: #
                                                {
                                                    application.applicationId
                                                }
                                            </p>

                                        </div>


                                        {/* STATUS */}

                                        <span
                                            className={`application-status ${application.applicationStatus
                                                ?.toLowerCase()
                                                }`}
                                        >
                                            {
                                                application.applicationStatus
                                            }
                                        </span>

                                    </div>


                                    {/* =========================
                                        APPLICATION DETAILS
                                    ========================= */}

                                    <div className="application-details">


                                        <div className="application-detail">

                                            <span>
                                                Proposed Price
                                            </span>

                                            <strong>
                                                ₹
                                                {
                                                    application.proposedPrice
                                                }
                                            </strong>

                                        </div>


                                        <div className="application-detail">

                                            <span>
                                                Estimated Days
                                            </span>

                                            <strong>
                                                {
                                                    application.estimatedDays
                                                }{" "}
                                                days
                                            </strong>

                                        </div>


                                        <div className="application-detail">

                                            <span>
                                                Applied On
                                            </span>

                                            <strong>

                                                {application.appliedAt
                                                    ? new Date(
                                                        application.appliedAt
                                                    ).toLocaleDateString()
                                                    : "Not available"}

                                            </strong>

                                        </div>

                                    </div>


                                    {/* =========================
                                        COVER LETTER
                                    ========================= */}

                                    {application.coverLetter && (

                                        <div className="cover-letter">

                                            <h3>
                                                Cover Letter
                                            </h3>

                                            <p>
                                                {
                                                    application.coverLetter
                                                }
                                            </p>

                                        </div>
                                    )}


                                    {/* =========================
                                        FOOTER
                                    ========================= */}

                                    <div className="application-card-footer">

                                        <button
                                            className="view-project-button"
                                            onClick={() =>
                                                handleViewProject(
                                                    application.gigId
                                                )
                                            }
                                        >
                                            View Project
                                        </button>

                                    </div>

                                </div>
                            )
                        )}

                    </div>

                </div>
            )}

        </div>
    );
}

export default MyApplications;