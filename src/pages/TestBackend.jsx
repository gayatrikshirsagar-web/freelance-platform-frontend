import { useEffect, useState } from "react";
import api from "../services/api";

function TestBackend() {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {

        api.get("/users")
            .then((response) => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch((error) => {
                console.error(error);
                setError("Could not connect to Spring Boot");
            });

    }, []);

    return (
        <div style={{ padding: "40px" }}>

            <h1>Backend Connection Test</h1>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            {users.map((user) => (
                <div key={user.userId}>

                    <h2>{user.name}</h2>

                    <p>Email: {user.email}</p>

                    <p>Phone: {user.phone}</p>

                    <p>Role: {user.role}</p>

                    <p>Status: {user.accountStatus}</p>

                </div>
            ))}

        </div>
    );
}

export default TestBackend;