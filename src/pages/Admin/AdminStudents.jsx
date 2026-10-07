import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./AdminStudents.css";

function AdminStudents() {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/admin/students");

            setStudents(response.data);

        } catch (error) {

            console.error("Error loading students:", error);

            setError("Unable to load students.");

        } finally {

            setLoading(false);
        }
    };


    const updateVerification = async (studentId, status) => {

        try {

            await api.put(
                `/admin/students/${studentId}/verification`,
                { status: status }
            );

            alert(
                status === "VERIFIED"
                    ? "Student verified successfully."
                    : "Student rejected successfully."
            );

            loadStudents();

        } catch (error) {

            console.error(
                "Error updating student verification:",
                error
            );

            alert("Unable to update student verification.");
        }
    };


    return (

        <div className="admin-page">

            {/* HEADER */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Manage Students
                    </h1>

                    <p>
                        View and manage all registered students
                        and freelancers.
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
                    Loading students...
                </div>

            )}


            {/* EMPTY */}

            {!loading && students.length === 0 && (

                <div className="admin-message">
                    No students found.
                </div>

            )}


            {/* TABLE */}

            {!loading && students.length > 0 && (

                <div className="admin-table-container">

                    <table className="admin-table">

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Name</th>

                                <th>Email</th>

                                <th>College</th>

                                <th>Course</th>

                                <th>Location</th>

                                <th>Verification</th>

                                <th>Action</th>

                            </tr>

                        </thead>


                        <tbody>

                            {students.map((student) => (

                                <tr key={student.studentId}>

                                    <td>
                                        {student.studentId}
                                    </td>

                                    <td>
                                        <strong>
                                            {student.user?.name || "-"}
                                        </strong>
                                    </td>

                                    <td>
                                        {student.user?.email || "-"}
                                    </td>

                                    <td>
                                        {student.collegeName || "-"}
                                    </td>

                                    <td>
                                        {student.course || "-"}
                                    </td>

                                    <td>
                                        {student.location || "-"}
                                    </td>

                                    <td>

                                        <span
                                            className={`status-badge ${
                                                student.verificationStatus ===
                                                "VERIFIED"
                                                    ? "status-verified"
                                                    : student.verificationStatus ===
                                                      "REJECTED"
                                                    ? "status-rejected"
                                                    : "status-pending"
                                            }`}
                                        >
                                            {student.verificationStatus ||
                                                "PENDING"}
                                        </span>

                                    </td>

                                    <td>

                                        <div className="action-buttons">

                                            <button
                                                className="verify-button"
                                                onClick={() =>
                                                    updateVerification(
                                                        student.studentId,
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
                                                        student.studentId,
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

export default AdminStudents;