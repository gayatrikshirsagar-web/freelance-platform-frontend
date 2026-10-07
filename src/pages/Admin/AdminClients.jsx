import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./AdminClients.css";

function AdminClients() {

    const navigate = useNavigate();

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/admin/clients");

            setClients(response.data);

        } catch (error) {

            console.error("Error loading clients:", error);

            setError("Unable to load clients.");

        } finally {

            setLoading(false);
        }
    };


    const updateVerification = async (clientId, status) => {

        try {

            await api.put(
                `/admin/clients/${clientId}/verification`,
                { status: status }
            );

            alert(
                status === "VERIFIED"
                    ? "Client verified successfully."
                    : "Client rejected successfully."
            );

            loadClients();

        } catch (error) {

            console.error(
                "Error updating client verification:",
                error
            );

            alert("Unable to update client verification.");
        }
    };


    return (

        <div className="admin-page">

            {/* HEADER */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Manage Clients
                    </h1>

                    <p>
                        View and manage all registered clients
                        on the platform.
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
                    Loading clients...
                </div>

            )}


            {/* EMPTY */}

            {!loading && clients.length === 0 && (

                <div className="admin-message">
                    No clients found.
                </div>

            )}


            {/* CLIENT TABLE */}

            {!loading && clients.length > 0 && (

                <div className="admin-table-container">

                    <table className="admin-table">

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Name</th>

                                <th>Email</th>

                                <th>Company</th>

                                <th>Location</th>

                                <th>Verification</th>

                                <th>Action</th>

                            </tr>

                        </thead>


                        <tbody>

                            {clients.map((client) => (

                                <tr key={client.clientId}>

                                    <td>
                                        {client.clientId}
                                    </td>

                                    <td>
                                        <strong>
                                            {client.user?.name || "-"}
                                        </strong>
                                    </td>

                                    <td>
                                        {client.user?.email || "-"}
                                    </td>

                                    <td>
                                        {client.companyName || "-"}
                                    </td>

                                    <td>
                                        {client.location || "-"}
                                    </td>

                                    <td>

                                        <span
                                            className={`status-badge ${
                                                client.verificationStatus ===
                                                "VERIFIED"
                                                    ? "status-verified"
                                                    : client.verificationStatus ===
                                                      "REJECTED"
                                                    ? "status-rejected"
                                                    : "status-pending"
                                            }`}
                                        >
                                            {client.verificationStatus}
                                        </span>

                                    </td>

                                    <td>

                                        <div className="action-buttons">

                                            <button
                                                className="verify-button"
                                                onClick={() =>
                                                    updateVerification(
                                                        client.clientId,
                                                        "VERIFIED"
                                                    )
                                                }
                                            >
                                                ✓ Verify
                                            </button>


                                            <button
                                                className="reject-button"
                                                onClick={() =>
                                                    updateVerification(
                                                        client.clientId,
                                                        "REJECTED"
                                                    )
                                                }
                                            >
                                                ✕ Reject
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
}

export default AdminClients;