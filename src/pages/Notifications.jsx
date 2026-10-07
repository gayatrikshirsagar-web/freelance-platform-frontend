import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Notifications.css";

function Notifications() {

    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);
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

        loadNotifications();

    }, [userId]);

    const loadNotifications = () => {

        setLoading(true);
        setError("");

        api.get(`/notifications/user/${userId}`)
            .then((response) => {

                console.log("Notifications:", response.data);

                setNotifications(response.data);

                setLoading(false);
            })
            .catch((error) => {

                console.error(
                    "Notification loading error:",
                    error
                );

                setError("Unable to load notifications.");
                setLoading(false);
            });
    };

    const markAsRead = (notificationId) => {

        api.put(
            `/notifications/${notificationId}/read`
        )
            .then(() => {

                setNotifications((previous) =>
                    previous.map((notification) =>
                        notification.notificationId ===
                        notificationId
                            ? {
                                  ...notification,
                                  isRead: true
                              }
                            : notification
                    )
                );

            })
            .catch((error) => {

                console.error(
                    "Mark notification error:",
                    error
                );
            });
    };

    const handleNotificationClick = (notification) => {

        if (!notification.isRead) {
            markAsRead(notification.notificationId);
        }

        // If notification is related to a project
        if (
            notification.relatedId &&
            (
                notification.notificationType ===
                    "PROJECT" ||
                notification.notificationType ===
                    "APPLICATION"
            )
        ) {

            navigate(
                `/project/${notification.relatedId}`
            );
        }
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

        <div className="notifications-page">

            <div className="notifications-container">

                <div className="notifications-header">

                    <button
                        className="notifications-back-button"
                        onClick={handleBack}
                    >
                        ← Back
                    </button>

                    <div>
                        <h2>Notifications</h2>

                        <p>
                            Stay updated with your projects
                            and applications.
                        </p>
                    </div>

                </div>


                <div className="notifications-content">

                    {loading && (
                        <p className="notification-status">
                            Loading notifications...
                        </p>
                    )}


                    {error && (
                        <p className="notification-error">
                            {error}
                        </p>
                    )}


                    {!loading &&
                        !error &&
                        notifications.length === 0 && (

                            <p className="notification-status">
                                No notifications yet.
                            </p>
                        )}


                    {!loading &&
                        !error &&
                        notifications.length > 0 && (

                            <div className="notification-list">

                                {notifications.map(
                                    (notification) => (

                                        <div
                                            key={
                                                notification.notificationId
                                            }
                                            className={
                                                notification.isRead
                                                    ? "notification-card"
                                                    : "notification-card unread"
                                            }
                                            onClick={() =>
                                                handleNotificationClick(
                                                    notification
                                                )
                                            }
                                        >

                                            <div className="notification-icon">
                                                🔔
                                            </div>


                                            <div className="notification-details">

                                                <h3>
                                                    {
                                                        notification.title
                                                    }
                                                </h3>

                                                <p>
                                                    {
                                                        notification.message
                                                    }
                                                </p>

                                                <span>
                                                    {
                                                        notification.createdAt
                                                    }
                                                </span>

                                            </div>


                                            {!notification.isRead && (
                                                <div className="unread-dot">
                                                </div>
                                            )}

                                        </div>

                                    )
                                )}

                            </div>
                        )}

                </div>

            </div>

        </div>
    );
}

export default Notifications;