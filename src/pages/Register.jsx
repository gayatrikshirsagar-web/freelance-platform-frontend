import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [selectedRole, setSelectedRole] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // ==========================================
    // HANDLE INPUT CHANGES
    // ==========================================

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    };


    // ==========================================
    // HANDLE REGISTRATION
    // ==========================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        // Check role
        if (!selectedRole) {
            alert("Please select Student / Freelancer or Client.");
            return;
        }


        // Check password
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }


        // Check password length
        if (formData.password.length < 6) {
            alert("Password must contain at least 6 characters.");
            return;
        }


        try {

            setLoading(true);


            // ==========================================
            // DATA SENT TO SPRING BOOT
            // ==========================================

            const userData = {

                name: formData.name,

                email: formData.email,

                passwordHash: formData.password,

                phone: formData.phone,

                role: selectedRole,

                accountStatus: "ACTIVE"

            };


            console.log("Sending data to backend:");
            console.log(userData);


            // ==========================================
            // POST REQUEST
            // ==========================================

            const response = await api.post(
                "/users",
                userData
            );


            console.log("Backend response:");
            console.log(response.data);


            // ==========================================
            // SUCCESS
            // ==========================================

            alert("Registration successful!");


            // Clear form
            setFormData({
                name: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: ""
            });


            // Go to login page
            navigate("/login");


        } catch (error) {

            console.error("Registration error:", error);


            // ==========================================
            // BACKEND ERROR
            // ==========================================

            if (error.response) {

                console.error(
                    "Backend response:",
                    error.response.data
                );

                alert(
                    "Registration failed: " +
                    JSON.stringify(error.response.data)
                );

            }

            // ==========================================
            // SERVER NOT REACHABLE
            // ==========================================

            else {

                alert(
                    "Unable to connect to Spring Boot backend. " +
                    "Make sure Spring Boot is running on port 8080."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="register-page">


            {/* ==========================================
                BACK TO HOME
            ========================================== */}

            <button
                className="back-home"
                onClick={() => navigate("/")}
            >
                ← Back to Home
            </button>



            {/* ==========================================
                LEFT SIDE
            ========================================== */}

            <div className="register-left">

                <div className="register-brand">
                    Freelance<span>Hub</span>
                </div>


                <div className="register-left-content">

                    <div className="register-badge">
                        ✨ Join the community
                    </div>


                    <h1>

                        Turn Your

                        <span>
                            {" "}Potential{" "}
                        </span>

                        Into

                        <span>
                            {" "}Opportunity.
                        </span>

                    </h1>


                    <p>

                        Whether you're looking to showcase your skills
                        or find talented people, FreelanceHub connects
                        you with the right opportunities.

                    </p>



                    <div className="benefits">


                        <div className="benefit">

                            <span>
                                ✓
                            </span>

                            Build your professional profile

                        </div>



                        <div className="benefit">

                            <span>
                                ✓
                            </span>

                            Connect with talented people

                        </div>



                        <div className="benefit">

                            <span>
                                ✓
                            </span>

                            Work on real-world projects

                        </div>



                        <div className="benefit">

                            <span>
                                ✓
                            </span>

                            Grow your career

                        </div>


                    </div>


                </div>

            </div>



            {/* ==========================================
                RIGHT SIDE
            ========================================== */}

            <div className="register-right">


                <div className="register-container">


                    {/* ==========================================
                        ROLE SELECTION
                    ========================================== */}

                    {!selectedRole ? (

                        <>


                            <div className="form-header">


                                <div className="small-logo">

                                    Freelance<span>
                                        Hub
                                    </span>

                                </div>


                                <h2>
                                    Create your account
                                </h2>


                                <p>

                                    First, tell us how you want to use
                                    FreelanceHub.

                                </p>


                            </div>



                            <div className="role-question">

                                <h3>
                                    I want to...
                                </h3>

                            </div>



                            <div className="role-cards">


                                {/* ==================================
                                    STUDENT / FREELANCER
                                ================================== */}

                                <button
                                    className="role-card"
                                    onClick={() =>
                                        setSelectedRole("STUDENT")
                                    }
                                >

                                    <div className="role-icon student-icon">

                                        🎓

                                    </div>


                                    <div className="role-content">


                                        <h3>
                                            Student / Freelancer
                                        </h3>


                                        <p>

                                            Find freelance work, build
                                            your portfolio and gain
                                            real-world experience.

                                        </p>


                                        <span className="role-arrow">
                                            →
                                        </span>


                                    </div>

                                </button>



                                {/* ==================================
                                    CLIENT
                                ================================== */}

                                <button
                                    className="role-card"
                                    onClick={() =>
                                        setSelectedRole("CLIENT")
                                    }
                                >

                                    <div className="role-icon client-icon">

                                        💼

                                    </div>


                                    <div className="role-content">


                                        <h3>
                                            Client
                                        </h3>


                                        <p>

                                            Find talented freelancers
                                            and get your projects
                                            completed.

                                        </p>


                                        <span className="role-arrow">
                                            →
                                        </span>


                                    </div>

                                </button>


                            </div>



                            {/* LOGIN */}

                            <div className="login-link">

                                Already have an account?

                                <button
                                    onClick={() =>
                                        navigate("/login")
                                    }
                                >

                                    Login

                                </button>

                            </div>


                        </>

                    ) : (


                        /* ==========================================
                           REGISTRATION FORM
                        ========================================== */

                        <>


                            {/* CHANGE ROLE */}

                            <button
                                className="change-role"
                                onClick={() =>
                                    setSelectedRole(null)
                                }
                            >

                                ← Change account type

                            </button>



                            {/* FORM HEADER */}

                            <div className="form-header">


                                <div className="selected-role-icon">

                                    {selectedRole === "STUDENT"
                                        ? "🎓"
                                        : "💼"
                                    }

                                </div>


                                <h2>

                                    Create your{" "}

                                    {selectedRole === "STUDENT"
                                        ? "Freelancer"
                                        : "Client"
                                    }{" "}

                                    account

                                </h2>


                                <p>

                                    Fill in your details to get started.

                                </p>


                            </div>



                            {/* ======================================
                                FORM
                            ====================================== */}

                            <form
                                className="register-form"
                                onSubmit={handleSubmit}
                            >


                                {/* NAME */}

                                <div className="input-group">

                                    <label>
                                        Full Name
                                    </label>


                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>



                                {/* EMAIL */}

                                <div className="input-group">

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



                                {/* PHONE */}

                                <div className="input-group">

                                    <label>
                                        Phone Number
                                    </label>


                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>



                                {/* PASSWORD */}

                               <div className="password-input-wrapper">
    <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Create a strong password"
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



                                {/* CONFIRM PASSWORD */}

                                <div className="input-group">

                                    <label>
                                        Confirm Password
                                    </label>


                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>



                                {/* TERMS */}

                                <div className="terms">

                                    <input
                                        type="checkbox"
                                        required
                                    />


                                    <span>

                                        I agree to the Terms of Service
                                        and Privacy Policy.

                                    </span>

                                </div>



                                {/* ==================================
                                    SUBMIT BUTTON
                                ================================== */}

                                <button
                                    type="submit"
                                    className="create-account-button"
                                    disabled={loading}
                                >

                                    {loading
                                        ? "Creating Account..."
                                        : `Create ${
                                            selectedRole === "STUDENT"
                                                ? "Freelancer"
                                                : "Client"
                                          } Account →`
                                    }

                                </button>


                            </form>



                            {/* LOGIN */}

                            <div className="login-link">

                                Already have an account?

                                <button
                                    onClick={() =>
                                        navigate("/login")
                                    }
                                >

                                    Login

                                </button>

                            </div>


                        </>

                    )}


                </div>


            </div>


        </div>

    );

}


export default Register;