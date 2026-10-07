import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./AdminApplications.css";

function AdminApplications() {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await api.get("/admin/applications");

            setApplications(response.data);

        } catch (error) {

            console.error(
                "Error loading applications:",
                error
            );

            setError("Unable to load applications.");

        } finally {

            setLoading(false);
        }
    };


    const updateStatus = async (
        applicationId,
        status
    ) => {

        try {

            await api.put(
                `/admin/applications/${applicationId}/status`,
                { status: status }
            );

            alert(
                "Application status updated successfully."
            );

            loadApplications();

        } catch (error) {

            console.error(
                "Error updating application:",
                error
            );

            alert(
                "Unable to update application status."
            );
        }
    };


    return (

        <div className="admin-page">

            {/* HEADER */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Manage Applications
                    </h1>

                    <p>
                        View and manage freelancer applications
                        submitted for projects.
                    </p>

                </div>

                <button
                    className="dashboard-button"
                    onClick={() =>
                        navigate("/admin-dashboard")
                    }
                >
                    ← Dashboard
                </button>

            </div>


            {/* ERROR */}

            {error && (

                <div className="admin-error">
                    {error}
                </div>

            )}


            {/* LOADING */}

            {loading && (

                <div className="admin-message">
                    Loading applications...
                </div>

            )}


            {/* EMPTY */}

            {!loading &&
                applications.length === 0 && (

                    <div className="admin-message">
                        No applications found.
                    </div>

                )}


            {/* TABLE */}

            {!loading &&
                applications.length > 0 && (

                    <div className="admin-table-container">

                        <table className="admin-table">

                            <thead>

                                <tr>

                                    <th>
                                        Application ID
                                    </th>

                                    <th>
                                        Project ID
                                    </th>

                                    <th>
                                        Student ID
                                    </th>

                                    <th>
                                        Proposed Price
                                    </th>

                                    <th>
                                        Estimated Days
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Applied At
                                    </th>

                                    <th>
                                        Change Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {applications.map(
                                    (application) => (

                                        <tr
                                            key={
                                                application.applicationId
                                            }
                                        >

                                            <td>
                                                <strong>
                                                    #
                                                    {
                                                        application.applicationId
                                                    }
                                                </strong>
                                            </td>

                                            <td>
                                                {
                                                    application.gigId
                                                }
                                            </td>

                                            <td>
                                                {
                                                    application.studentId
                                                }
                                            </td>

                                            <td className="price-cell">

                                                ₹
                                                {
                                                    application.proposedPrice ||
                                                    0
                                                }

                                            </td>

                                            <td>
                                                {
                                                    application.estimatedDays ||
                                                    "-"
                                                }{" "}
                                                days
                                            </td>

                                            <td>

                                                <span
                                                    className={`application-status ${getApplicationStatusClass(
                                                        application.applicationStatus
                                                    )}`}
                                                >
                                                    {
                                                        application.applicationStatus
                                                    }
                                                </span>

                                            </td>

                                            <td>
                                                {
                                                    application.appliedAt
                                                        ? new Date(
                                                              application.appliedAt
                                                          ).toLocaleString()
                                                        : "-"
                                                }
                                            </td>

                                            <td>

                                                <select
                                                    className="application-select"
                                                    value={
                                                        application.applicationStatus
                                                    }
                                                    onChange={(event) =>
                                                        updateStatus(
                                                            application.applicationId,
                                                            event.target.value
                                                        )
                                                    }
                                                >

                                                    <option value="PENDING">
                                                        PENDING
                                                    </option>

                                                    <option value="ACCEPTED">
                                                        ACCEPTED
                                                    </option>

                                                    <option value="REJECTED">
                                                        REJECTED
                                                    </option>

                                                </select>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

        </div>
    );
}


function getApplicationStatusClass(status) {

    switch (status) {

        case "PENDING":
            return "application-pending";

        case "ACCEPTED":
            return "application-accepted";

        case "REJECTED":
            return "application-rejected";

        default:
            return "application-default";
    }
}


export default AdminApplications;