import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "./StudentPublicProfile.css";

function StudentPublicProfile() {

    const navigate = useNavigate();
    const { userId } = useParams();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!userId) {
            setError("Student profile not found.");
            setLoading(false);
            return;
        }

        loadProfile();

    }, [userId]);


    const loadProfile = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                `/student-profile/${userId}`
            );

            setProfile(response.data);

        } catch (err) {

            console.error(
                "Error loading student public profile:",
                err
            );

            setError(
                "Unable to load freelancer profile."
            );

        } finally {

            setLoading(false);
        }
    };


    if (loading) {

        return (
            <div className="public-profile-page">

                <div className="public-profile-loading">

                    <h2>
                        Loading Profile...
                    </h2>

                </div>

            </div>
        );
    }


    if (error || !profile) {

        return (
            <div className="public-profile-page">

                <div className="public-profile-error">

                    <h2>
                        {error || "Profile not found."}
                    </h2>

                    <button
                        onClick={() =>
                            navigate("/client-dashboard")
                        }
                    >
                        ← Back to Dashboard
                    </button>

                </div>

            </div>
        );
    }


    return (

        <div className="public-profile-page">

            {/* ================= TOP BAR ================= */}

            <div className="public-profile-topbar">

                <button
                    className="public-profile-back"
                    onClick={() =>
                        navigate("/client-dashboard")
                    }
                >
                    ← Back to Dashboard
                </button>

                <h1>
                    Freelancer Profile
                </h1>

            </div>


            {/* ================= PROFILE ================= */}

            <div className="public-profile-container">


                {/* ================= HEADER ================= */}

                <div className="public-profile-header">

                    <div className="public-profile-avatar">

                        {profile.profilePicture ? (

                            <img
                                src={profile.profilePicture}
                                alt="Profile"
                                onError={(event) => {
                                    event.target.style.display =
                                        "none";
                                }}
                            />

                        ) : (

                            <span>
                                {profile.name
                                    ? profile.name
                                        .charAt(0)
                                        .toUpperCase()
                                    : "S"}
                            </span>

                        )}

                    </div>


                    <div className="public-profile-info">

                        <h2>
                            {profile.name || "Freelancer"}
                        </h2>

                        <p>
                            {profile.course ||
                                "Freelancer"}
                        </p>

                        <p>
                            📍{" "}
                            {profile.location ||
                                "Location not specified"}
                        </p>

                    </div>


                    <div className="public-verification">

                        {profile.verificationStatus ===
                        "VERIFIED"
                            ? "✓ Verified"
                            : profile.verificationStatus ||
                              "PENDING"}

                    </div>

                </div>


                {/* ================= ABOUT ================= */}

                <div className="public-profile-section">

                    <h2>
                        About
                    </h2>

                    <p className="public-bio">

                        {profile.bio ||
                            "This freelancer has not added a bio yet."}

                    </p>

                </div>


                {/* ================= EDUCATION ================= */}

                <div className="public-profile-section">

                    <h2>
                        Education
                    </h2>

                    <div className="public-profile-grid">

                        <div className="public-profile-field">

                            <span>
                                College
                            </span>

                            <strong>
                                {profile.collegeName ||
                                    "Not specified"}
                            </strong>

                        </div>


                        <div className="public-profile-field">

                            <span>
                                Course
                            </span>

                            <strong>
                                {profile.course ||
                                    "Not specified"}
                            </strong>

                        </div>


                        <div className="public-profile-field">

                            <span>
                                Year of Study
                            </span>

                            <strong>
                                {profile.yearOfStudy
                                    ? `Year ${profile.yearOfStudy}`
                                    : "Not specified"}
                            </strong>

                        </div>


                        <div className="public-profile-field">

                            <span>
                                Education
                            </span>

                            <strong>
                                {profile.education ||
                                    "Not specified"}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* ================= FREELANCING ================= */}

                <div className="public-profile-section">

                    <h2>
                        Freelancing Information
                    </h2>

                    <div className="public-profile-grid">

                        <div className="public-profile-field">

                            <span>
                                Hourly Rate
                            </span>

                            <strong>

                                {profile.hourlyRate
                                    ? `₹${profile.hourlyRate}/hr`
                                    : "Not specified"}

                            </strong>

                        </div>


                        <div className="public-profile-field">

                            <span>
                                Availability
                            </span>

                            <strong>

                                {profile.availabilityStatus ||
                                    "Not specified"}

                            </strong>

                        </div>


                        <div className="public-profile-field">

                            <span>
                                Location
                            </span>

                            <strong>

                                {profile.location ||
                                    "Not specified"}

                            </strong>

                        </div>

                    </div>

                </div>


                {/* ================= CONTACT ================= */}

                <div className="public-profile-section">

                    <h2>
                        Contact Information
                    </h2>

                    <div className="public-profile-grid">

                        <div className="public-profile-field">

                            <span>
                                Email
                            </span>

                            <strong>
                                {profile.email ||
                                    "Not available"}
                            </strong>

                        </div>


                        <div className="public-profile-field">

                            <span>
                                Phone
                            </span>

                            <strong>
                                {profile.phone ||
                                    "Not available"}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* ================= ACTIONS ================= */}

                <div className="public-profile-actions">

                    <button
                        onClick={() =>
                            navigate("/client-dashboard")
                        }
                    >
                        ← Back to Freelancers
                    </button>

                </div>

            </div>

        </div>
    );
}

export default StudentPublicProfile;