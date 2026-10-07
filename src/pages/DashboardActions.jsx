import { useNavigate } from "react-router-dom";

function DashboardActions({ role }) {

    const navigate = useNavigate();

    const handleDashboard = () => {

        if (role === "STUDENT") {
            navigate("/student-dashboard");
        } else if (role === "CLIENT") {
            navigate("/client-dashboard");
        }
    };

    const handleLogout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("name");

        navigate("/login");
    };

    return (
        <div className="dashboard-actions">

            <button
                className="back-dashboard-button"
                onClick={handleDashboard}
            >
                ← Back to Dashboard
            </button>

            <button
                className="logout-button"
                onClick={handleLogout}
            >
                Logout
            </button>

        </div>
    );
}

export default DashboardActions;