import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [selectedRole, setSelectedRole] = useState(null);


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!selectedRole) {
            alert("Please select your account type.");
            return;
        }

        setLoading(true);

        try {

            /*
             * Get all users from backend
             * and find the user using email.
             *
             * NOTE:
             * This is temporary login logic.
             * Later we will replace this with
             * a proper Spring Security + JWT login API.
             */

            const response = await api.get("/users");

            const users = response.data;

            const user = users.find(
                (u) =>
                    u.email.toLowerCase() ===
                    formData.email.toLowerCase()
            );

            if (!user) {

                alert("No account found with this email.");
                setLoading(false);
                return;
            }

            // Check password
            if (user.passwordHash !== formData.password) {

                alert("Incorrect password.");
                setLoading(false);
                return;
            }

            // Check selected role
            if (user.role !== selectedRole) {

                alert(
                    `This account is registered as ${user.role}.`
                );

                setLoading(false);
                return;
            }

            // Save logged-in user
            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            // Save individual user details
            localStorage.setItem("userId", user.userId);
            localStorage.setItem("role", user.role);
            localStorage.setItem("name", user.name);

            alert("Login successful!");

            // Redirect according to role
            if (user.role === "STUDENT") {

                navigate("/student-dashboard");

            } else if (user.role === "CLIENT") {

                navigate("/client-dashboard");

            } else if (user.role === "ADMIN") {

                navigate("/admin-dashboard");

            } else {

                alert("Unknown account type.");
            }

        } catch (error) {

            console.error("Login error:", error);

            alert(
                "Unable to connect to the backend. " +
                "Please make sure Spring Boot is running."
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="login-page">

            {/* LEFT SIDE */}

            <div className="login-left">

                <button
                    className="back-home"
                    onClick={() => navigate("/")}
                >
                    ← Back to Home
                </button>

                <div className="login-brand">
                    Freelance<span>Hub</span>
                </div>

                <div className="login-left-content">

                    <div className="login-badge">
                        🚀 Welcome back
                    </div>

                    <h1>
                        Turn Your
                        <span> Skills </span>
                        Into
                        <span> Opportunities.</span>
                    </h1>

                    <p>
                        Connect with talented people,
                        discover exciting projects and
                        build your professional future
                        with FreelanceHub.
                    </p>

                    <div className="login-benefits">

                        <div className="login-benefit">
                            <span>✓</span>
                            Find exciting freelance opportunities
                        </div>

                        <div className="login-benefit">
                            <span>✓</span>
                            Connect with professionals
                        </div>

                        <div className="login-benefit">
                            <span>✓</span>
                            Manage your projects easily
                        </div>

                        <div className="login-benefit">
                            <span>✓</span>
                            Grow your professional network
                        </div>

                    </div>

                </div>

            </div>


            {/* RIGHT SIDE */}

            <div className="login-right">

                <div className="login-container">

                    {!selectedRole ? (

                        /* ================= ROLE SELECTION ================= */

                        <>

                            <div className="login-header">

                                <div className="small-logo">
                                    Freelance<span>Hub</span>
                                </div>

                                <h2>
                                    Welcome Back
                                </h2>

                                <p>
                                    Select your account type to continue.
                                </p>

                            </div>


                            <div className="login-role-question">

                                <h3>
                                    Login as
                                </h3>

                            </div>


                            <div className="login-role-cards">

                                {/* ================= STUDENT ================= */}

                                <button
                                    className="login-role-card"
                                    onClick={() =>
                                        setSelectedRole("STUDENT")
                                    }
                                >

                                    <div className="login-role-icon student-login-icon">
                                        🎓
                                    </div>

                                    <div className="login-role-content">

                                        <h3>
                                            Student / Freelancer
                                        </h3>

                                        <p>
                                            Login to find projects,
                                            manage applications and
                                            build your portfolio.
                                        </p>

                                        <span>
                                            →
                                        </span>

                                    </div>

                                </button>


                                {/* ================= CLIENT ================= */}

                                <button
                                    className="login-role-card"
                                    onClick={() =>
                                        setSelectedRole("CLIENT")
                                    }
                                >

                                    <div className="login-role-icon client-login-icon">
                                        💼
                                    </div>

                                    <div className="login-role-content">

                                        <h3>
                                            Client
                                        </h3>

                                        <p>
                                            Login to post projects,
                                            find freelancers and
                                            manage your work.
                                        </p>

                                        <span>
                                            →
                                        </span>

                                    </div>

                                </button>


                                {/* ================= ADMIN ================= */}

                                <button
                                    className="login-role-card"
                                    onClick={() =>
                                        setSelectedRole("ADMIN")
                                    }
                                >

                                    <div className="login-role-icon admin-login-icon">
                                        🛡️
                                    </div>

                                    <div className="login-role-content">

                                        <h3>
                                            Admin
                                        </h3>

                                        <p>
                                            Login to manage users,
                                            projects, applications
                                            and platform activities.
                                        </p>

                                        <span>
                                             →
                                        </span>

                                    </div>

                                </button>


                            </div>


                            <div className="register-link">

                                Don't have an account?

                                <button
                                    onClick={() =>
                                        navigate("/register")
                                    }
                                >
                                    Create Account
                                </button>

                            </div>

                        </>

                    ) : (

                        /* ================= LOGIN FORM ================= */

                        <>

                            <button
                                className="change-login-role"
                                onClick={() =>
                                    setSelectedRole(null)
                                }
                            >
                                ← Change account type
                            </button>


                            <div className="login-header">

                                <div className="selected-login-icon">

                                    {selectedRole === "STUDENT"
                                        ? "🎓"
                                        : selectedRole === "CLIENT"
                                            ? "💼"
                                            : "🛡️"
                                    }

                                </div>

                                <h2>

                                    Login as{" "}

                                    {selectedRole === "STUDENT"
                                        ? "Student / Freelancer"
                                        : selectedRole === "CLIENT"
                                            ? "Client"
                                            : "Admin"
                                    }

                                </h2>

                                <p>
                                    Enter your credentials to continue.
                                </p>

                            </div>


                            <form
                                className="login-form"
                                onSubmit={handleSubmit}
                            >

                                {/* EMAIL */}

                                <div className="login-input-group">

                                    <label>
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                {/* PASSWORD */}

                                <div className="password-input-wrapper">
    <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required
    />

    <button
        type="button"
        className="password-toggle"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        title={showPassword ? "Hide password" : "Show password"}
    >
        {showPassword ? "🙈" : "👁️"}
    </button>
</div>


                                <div className="login-options">

                                    <label>

                                        <input
                                            type="checkbox"
                                        />

                                        Remember me

                                    </label>

                                    <button
                                        type="button"
                                        className="forgot-password"
                                        onClick={() =>
                                            alert(
                                                "Password recovery will be implemented later."
                                            )
                                        }
                                    >
                                        Forgot Password?
                                    </button>

                                </div>


                                <button
                                    type="submit"
                                    className="login-button"
                                    disabled={loading}
                                >

                                    {loading
                                        ? "Logging in..."
                                        : "Login →"
                                    }

                                </button>

                            </form>


                            <div className="register-link">

                                Don't have an account?

                                <button
                                    onClick={() =>
                                        navigate("/register")
                                    }
                                >
                                    Create Account
                                </button>

                            </div>

                        </>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Login;