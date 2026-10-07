import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./AdminProjects.css";

function AdminProjects() {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/admin/projects");

            setProjects(response.data);

        } catch (error) {

            console.error("Error loading projects:", error);

            setError("Unable to load projects.");

        } finally {

            setLoading(false);
        }
    };


    const updateStatus = async (gigId, status) => {

        try {

            await api.put(
                `/admin/projects/${gigId}/status`,
                { status: status }
            );

            alert("Project status updated successfully.");

            loadProjects();

        } catch (error) {

            console.error(
                "Error updating project status:",
                error
            );

            alert("Unable to update project status.");
        }
    };


    return (

        <div className="admin-page">

            {/* HEADER */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Manage Projects
                    </h1>

                    <p>
                        View and manage all projects posted
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
                    Loading projects...
                </div>

            )}


            {/* EMPTY */}

            {!loading && projects.length === 0 && (

                <div className="admin-message">
                    No projects found.
                </div>

            )}


            {/* TABLE */}

            {!loading && projects.length > 0 && (

                <div className="admin-table-container">

                    <table className="admin-table">

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Project</th>

                                <th>Client ID</th>

                                <th>Budget</th>

                                <th>Deadline</th>

                                <th>Status</th>

                                <th>Change Status</th>

                            </tr>

                        </thead>


                        <tbody>

                            {projects.map((project) => (

                                <tr key={project.gigId}>

                                    <td>
                                        {project.gigId}
                                    </td>

                                    <td>

                                        <strong>
                                            {project.title}
                                        </strong>

                                        <div className="project-description">

                                            {project.description
                                                ? project.description.length > 80
                                                    ? project.description.substring(
                                                        0,
                                                        80
                                                    ) + "..."
                                                    : project.description
                                                : "No description"}

                                        </div>

                                    </td>

                                    <td>
                                        {project.clientId}
                                    </td>

                                    <td>
                                        ₹{project.budgetMin || 0}
                                        {" - "}
                                        ₹{project.budgetMax || 0}
                                    </td>

                                    <td>
                                        {project.deadline || "-"}
                                    </td>

                                    <td>

                                        <span
                                            className={`project-status ${getStatusClass(
                                                project.status
                                            )}`}
                                        >
                                            {project.status}
                                        </span>

                                    </td>

                                    <td>

                                        <select
                                            className="status-select"
                                            value={project.status}
                                            onChange={(event) =>
                                                updateStatus(
                                                    project.gigId,
                                                    event.target.value
                                                )
                                            }
                                        >

                                            <option value="OPEN">
                                                OPEN
                                            </option>

                                            <option value="IN_PROGRESS">
                                                IN_PROGRESS
                                            </option>

                                            <option value="COMPLETED">
                                                COMPLETED
                                            </option>

                                            <option value="CLOSED">
                                                CLOSED
                                            </option>

                                        </select>

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


function getStatusClass(status) {

    switch (status) {

        case "OPEN":
            return "project-open";

        case "IN_PROGRESS":
            return "project-progress";

        case "COMPLETED":
            return "project-completed";

        case "CLOSED":
            return "project-closed";

        default:
            return "project-default";
    }
}


export default AdminProjects;