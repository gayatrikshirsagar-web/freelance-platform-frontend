import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./ClientApplications.css";

function ClientApplications() {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =====================================================
    // LOAD APPLICATIONS
    // =====================================================

    useEffect(() => {

        const userId = localStorage.getItem("userId");
        const role = localStorage.getItem("role");

        // Check login
        if (!userId) {
            alert("Please login first.");
            navigate("/login");
            return;
        }

        // Check role
        if (role !== "CLIENT") {
            alert("Only clients can view applications.");
            navigate("/login");
            return;
        }

        loadApplications(userId);

    }, [navigate]);


    const loadApplications = async (userId) => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                `/applications/client/${userId}`
            );

            console.log(
                "Client applications:",
                response.data
            );

            setApplications(response.data);

        } catch (error) {

            console.error(
                "Application loading error:",
                error
            );

            setError(
                "Unable to load applications. Please try again."
            );

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // VIEW PROJECT
    // =====================================================

    const handleViewProject = (gigId) => {
        navigate(`/project/${gigId}`);
    };

// =====================================================
// UPDATE APPLICATION STATUS
// =====================================================

const handleApplicationStatus = async (
    applicationId,
    status
) => {

    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("Please login first.");
        navigate("/login");
        return;
    }

    try {

        const response = await api.put(
            `/applications/${applicationId}/status`,
            {
                userId: Number(userId),
                status: status
            }
        );

        console.log(
            "Application updated:",
            response.data
        );

        // Update the application immediately on screen
        setApplications((previousApplications) =>
            previousApplications.map((application) =>
                application.applicationId === applicationId
                    ? {
                        ...application,
                        applicationStatus: status,
                        reviewedAt: response.data.reviewedAt
                    }
                    : application
            )
        );

        alert(
            status === "ACCEPTED"
                ? "Application accepted successfully!"
                : "Application rejected successfully!"
        );

    } catch (error) {

        console.error(
            "Application status update error:",
            error
        );

        if (
            error.response &&
            error.response.data
        ) {

            alert(
                typeof error.response.data === "string"
                    ? error.response.data
                    : "Unable to update application."
            );

        } else {

            alert(
                "Unable to update application."
            );
        }
    }
};
    // =====================================================
    // BACK TO DASHBOARD
    // =====================================================

    const handleBackToDashboard = () => {
        navigate("/client-dashboard");
    };


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("name");

        navigate("/login");
    };


    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (date) => {

        if (!date) {
            return "N/A";
        }

        return new Date(date).toLocaleDateString();
    };


    return (

        <div className="client-applications-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <header className="client-applications-header">

                <div>

                    <h1>
                        Applications
                    </h1>

                    <p>
                        View applications received
                        for your projects
                    </p>

                </div>


                <div className="client-header-actions">

                    <button
                        className="back-dashboard-button"
                        onClick={handleBackToDashboard}
                    >
                        ← Dashboard
                    </button>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <main className="client-applications-content">


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

                    <div className="applications-message">

                        Loading applications...

                    </div>

                )}


                {/* =================================================
                    ERROR
                ================================================= */}

                {!loading && error && (

                    <div className="applications-error">

                        {error}

                    </div>

                )}


                {/* =================================================
                    NO APPLICATIONS
                ================================================= */}

                {!loading &&
                    !error &&
                    applications.length === 0 && (

                        <div className="no-applications">

                            <div className="empty-icon">
                                📄
                            </div>

                            <h2>
                                No applications yet
                            </h2>

                            <p>
                                You have not received
                                any applications for
                                your projects yet.
                            </p>

                            <button
                                onClick={
                                    handleBackToDashboard
                                }
                            >
                                Back to Dashboard
                            </button>

                        </div>
                    )}


                {/* =================================================
                    APPLICATION LIST
                ================================================= */}

                {!loading &&
                    !error &&
                    applications.length > 0 && (

                        <div className="applications-container">


                            {/* SUMMARY */}

                            <div className="applications-summary">

                                <h2>
                                    Received Applications
                                </h2>

                                <span>

                                    {applications.length}
                                    {" "}
                                    application
                                    {applications.length !== 1
                                        ? "s"
                                        : ""}

                                </span>

                            </div>


                            {/* APPLICATIONS */}

                            <div className="applications-list">

                                {applications.map(
                                    (application) => (

                                        <div
                                            className="application-card"
                                            key={
                                                application.applicationId
                                            }
                                        >


                                            {/* =================================
                                                CARD HEADER
                                            ================================= */}

                                            <div className="application-card-header">

                                                <div>

                                                    <h3>
                                                        {
                                                            application.projectTitle
                                                        }
                                                    </h3>

                                                    <p className="application-id">
                                                        Application ID:
                                                        {" "}
                                                        {
                                                            application.applicationId
                                                        }
                                                    </p>

                                                </div>


                                                <span
                                                    className={`application-status ${application.applicationStatus
                                                        ?.toLowerCase()
                                                        .replace(
                                                            "_",
                                                            "-"
                                                        )}`}
                                                >
                                                    {
                                                        application.applicationStatus
                                                    }
                                                </span>

                                            </div>


                                            {/* =================================
                                                APPLICATION DETAILS
                                            ================================= */}

                                            <div className="application-details">


                                                {/* STUDENT ID */}

                                                <div className="detail-item">

                                                    <span className="detail-label">
                                                        Student ID
                                                    </span>

                                                    <strong className="detail-value">
                                                        {
                                                            application.studentId
                                                        }
                                                    </strong>

                                                </div>


                                                {/* PROPOSED PRICE */}

                                                <div className="detail-item">

                                                    <span className="detail-label">
                                                        Proposed Price
                                                    </span>

                                                    <strong className="detail-value">
                                                        ₹
                                                        {
                                                            application.proposedPrice
                                                        }
                                                    </strong>

                                                </div>


                                                {/* ESTIMATED DAYS */}

                                                <div className="detail-item">

                                                    <span className="detail-label">
                                                        Estimated Days
                                                    </span>

                                                    <strong className="detail-value">
                                                        {
                                                            application.estimatedDays
                                                        }
                                                        {" "}
                                                        days
                                                    </strong>

                                                </div>


                                                {/* APPLIED ON */}

                                                <div className="detail-item">

                                                    <span className="detail-label">
                                                        Applied On
                                                    </span>

                                                    <strong className="detail-value">
                                                        {
                                                            formatDate(
                                                                application.appliedAt
                                                            )
                                                        }
                                                    </strong>

                                                </div>

                                            </div>


                                            {/* =================================
                                                COVER LETTER
                                            ================================= */}

                                            <div className="cover-letter-section">

                                                <h4>
                                                    Cover Letter
                                                </h4>

                                                <p>
                                                    {
                                                        application.coverLetter ||
                                                        "No cover letter provided."
                                                    }
                                                </p>

                                            </div>


                                            {/* =================================
                                                ACTIONS
                                            ================================= */}

                                            <div className="application-card-actions">

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
                                            {/* =================================
    ACTIONS
================================= */}

<div className="application-card-actions">

   

    {/* ACCEPT / REJECT ONLY FOR PENDING */}

    {application.applicationStatus === "PENDING" && (

        <>

            <button
                className="accept-application-button"
                onClick={() =>
                    handleApplicationStatus(
                        application.applicationId,
                        "ACCEPTED"
                    )
                }
            >
                ✓ Accept
            </button>


            <button
                className="reject-application-button"
                onClick={() =>
                    handleApplicationStatus(
                        application.applicationId,
                        "REJECTED"
                    )
                }
            >
                ✕ Reject
            </button>

        </>

    )}

</div>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    )}

            </main>

        </div>
    );
}

export default ClientApplications;