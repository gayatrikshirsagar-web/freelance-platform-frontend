import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "./Chat.css";

function Chat() {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");

    const userId = Number(localStorage.getItem("userId"));
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (!userId) {
            alert("Please login first.");
            navigate("/login");
            return;
        }

        loadMessages();
    }, [projectId]);

    const loadMessages = () => {
        setLoading(true);

        api.get(`/messages/project/${projectId}`)
            .then((response) => {
                console.log("Messages:", response.data);
                setMessages(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Message loading error:", error);
                setError("Unable to load messages.");
                setLoading(false);
            });
    };

    const handleSendMessage = () => {
        if (!messageText.trim()) {
            return;
        }

        let receiverId;

        if (role === "STUDENT") {
            receiverId = 5;
        } else if (role === "CLIENT") {
            receiverId = 4;
        } else {
            alert("Invalid user role.");
            return;
        }

        const messageData = {
            projectId: Number(projectId),
            senderId: userId,
            receiverId: receiverId,
            messageText: messageText,
            attachmentUrl: null
        };

        console.log("Sending message:", messageData);

        setSending(true);

        api.post("/messages", messageData)
            .then((response) => {
                console.log("Message sent:", response.data);

                setMessageText("");

                loadMessages();
            })
            .catch((error) => {
                console.error("Message sending error:", error);

                if (error.response) {
                    console.error("Backend response:", error.response.data);
                }

                alert("Unable to send message.");
            })
            .finally(() => {
                setSending(false);
            });
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const handleBack = () => {
        if (role === "STUDENT") {
            navigate("/active-projects");
        } else {
            navigate("/client-dashboard");
        }
    };

    return (
        <div className="chat-page">

            <div className="chat-container">

                <div className="chat-header">

                    <button
                        className="chat-back-button"
                        onClick={handleBack}
                    >
                        ← Back
                    </button>

                    <div>
                        <h2>Project Chat</h2>
                        <p>Project ID: {projectId}</p>
                    </div>

                </div>

                <div className="chat-messages">

                    {loading && (
                        <p className="chat-status">
                            Loading messages...
                        </p>
                    )}

                    {error && (
                        <p className="chat-error">
                            {error}
                        </p>
                    )}

                    {!loading && !error && messages.length === 0 && (
                        <p className="chat-status">
                            No messages yet. Start the conversation.
                        </p>
                    )}

                    {messages.map((message) => {

                        const isOwnMessage =
                            Number(message.senderId) === userId;

                        return (
                            <div
                                key={message.messageId}
                                className={
                                    isOwnMessage
                                        ? "message-row own-message"
                                        : "message-row received-message"
                                }
                            >

                                <div className="message-bubble">

                                    <p className="message-text">
                                        {message.messageText}
                                    </p>

                                    <span className="message-time">
                                        {new Date(
                                            message.sentAt
                                        ).toLocaleString()}
                                    </span>

                                </div>

                            </div>
                        );
                    })}

                </div>

                <div className="chat-input-area">

                    <textarea
                        value={messageText}
                        onChange={(event) =>
                            setMessageText(event.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        rows="2"
                    />

                    <button
                        onClick={handleSendMessage}
                        disabled={sending || !messageText.trim()}
                    >
                        {sending ? "Sending..." : "Send"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Chat;