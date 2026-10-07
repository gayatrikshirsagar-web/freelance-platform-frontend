import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Messages.css";

function Messages() {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const userId = Number(localStorage.getItem("userId"));
    const role = localStorage.getItem("role");

    useEffect(() => {

        if (!userId) {
            alert("Please login first.");
            navigate("/login");
            return;
        }

        loadProjects();

    }, [userId, role]);

    const loadProjects = () => {

        setLoading(true);
        setError("");

        let url = "";

        if (role === "STUDENT") {

            url = `/gigs/student/${userId}`;

        } else if (role === "CLIENT") {

            url = `/gigs/client/${userId}`;

        } else {

            setError("Invalid user role.");
            setLoading(false);
            return;
        }

        api.get(url)
            .then((response) => {

                console.log("Projects:", response.data);

                setProjects(response.data);
                setLoading(false);

            })
            .catch((error) => {

                console.error("Projects loading error:", error);

                setError("Unable to load projects.");
                setLoading(false);
            });
    };

    const openChat = (projectId) => {

        navigate(`/chat/${projectId}`);
    };

    const handleBack = () => {

        if (role === "STUDENT") {

            navigate("/student-dashboard");

        } else if (role === "CLIENT") {

            navigate("/client-dashboard");

        } else {

            navigate("/");
        }
    };

    return (
        <div className="messages-page">

            <div className="messages-container">

                <div className="messages-header">

                    <button
                        className="messages-back-button"
                        onClick={handleBack}
                    >
                        ← Back
                    </button>

                    <div>
                        <h2>Messages</h2>

                        <p>
                            Select a project to continue the conversation.
                        </p>
                    </div>

                </div>


                <div className="messages-content">

                    {loading && (
                        <p className="messages-status">
                            Loading projects...
                        </p>
                    )}


                    {error && (
                        <p className="messages-error">
                            {error}
                        </p>
                    )}


                    {!loading &&
                        !error &&
                        projects.length === 0 && (

                            <p className="messages-status">
                                No projects available for messaging.
                            </p>
                        )}


                    {!loading &&
                        !error &&
                        projects.length > 0 && (

                            <div className="project-list">

                                {projects.map((project) => (

                                    <div
                                        className="project-message-card"
                                        key={project.gigId}
                                    >

                                        <div className="project-info">

                                            <h3>
                                                {project.title}
                                            </h3>

                                            <p>
                                                Project ID: {project.gigId}
                                            </p>

                                            <p>
                                                Status: {project.status}
                                            </p>

                                        </div>


                                        <button
                                            className="open-chat-button"
                                            onClick={() =>
                                                openChat(project.gigId)
                                            }
                                        >
                                            💬 Open Chat
                                        </button>

                                    </div>

                                ))}

                            </div>
                        )}

                </div>

            </div>

        </div>
    );
}

export default Messages;