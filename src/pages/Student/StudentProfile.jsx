import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./StudentProfile.css";

function StudentProfile() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        userId: "",
        studentId: "",
        name: "",
        email: "",
        phone: "",
        profilePicture: "",
        collegeName: "",
        course: "",
        yearOfStudy: "",
        education: "",
        bio: "",
        location: "",
        hourlyRate: "",
        availabilityStatus: "",
        verificationStatus: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // ==========================================
    // GET LOGGED-IN USER ID
    // ==========================================

    const userId = localStorage.getItem("userId");


    // ==========================================
    // LOAD PROFILE
    // ==========================================

    useEffect(() => {

        if (!userId) {

            setError("User is not logged in.");
            setLoading(false);

            return;
        }

        loadProfile();

    }, [userId]);


    // ==========================================
    // GET PROFILE FROM BACKEND
    // ==========================================

    const loadProfile = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await api.get(
                    `/student-profile/${userId}`
                );

            setProfile({

                userId:
                    response.data.userId || "",

                studentId:
                    response.data.studentId || "",

                name:
                    response.data.name || "",

                email:
                    response.data.email || "",

                phone:
                    response.data.phone || "",

                profilePicture:
                    response.data.profilePicture || "",

                collegeName:
                    response.data.collegeName || "",

                course:
                    response.data.course || "",

                yearOfStudy:
                    response.data.yearOfStudy || "",

                education:
                    response.data.education || "",

                bio:
                    response.data.bio || "",

                location:
                    response.data.location || "",

                hourlyRate:
                    response.data.hourlyRate || "",

                availabilityStatus:
                    response.data.availabilityStatus || "",

                verificationStatus:
                    response.data.verificationStatus || ""

            });

        } catch (err) {

            console.error(
                "Error loading profile:",
                err
            );

            setError(
                "Unable to load your profile."
            );

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // HANDLE INPUT CHANGES
    // ==========================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setProfile((previousProfile) => ({

            ...previousProfile,

            [name]: value

        }));
    };


    // ==========================================
    // SAVE PROFILE
    // ==========================================

    const handleSave = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);
            setMessage("");
            setError("");


            const updateData = {

                name: profile.name,

                phone: profile.phone,

                profilePicture:
                    profile.profilePicture,

                collegeName:
                    profile.collegeName,

                course:
                    profile.course,

                yearOfStudy:
                    profile.yearOfStudy
                        ? Number(profile.yearOfStudy)
                        : null,

                education:
                    profile.education,

                bio:
                    profile.bio,

                location:
                    profile.location,

                hourlyRate:
                    profile.hourlyRate
                        ? Number(profile.hourlyRate)
                        : null,

                availabilityStatus:
                    profile.availabilityStatus

            };


            const response =
                await api.put(
                    `/student-profile/${userId}`,
                    updateData
                );


            setProfile({

                userId:
                    response.data.userId || "",

                studentId:
                    response.data.studentId || "",

                name:
                    response.data.name || "",

                email:
                    response.data.email || "",

                phone:
                    response.data.phone || "",

                profilePicture:
                    response.data.profilePicture || "",

                collegeName:
                    response.data.collegeName || "",

                course:
                    response.data.course || "",

                yearOfStudy:
                    response.data.yearOfStudy || "",

                education:
                    response.data.education || "",

                bio:
                    response.data.bio || "",

                location:
                    response.data.location || "",

                hourlyRate:
                    response.data.hourlyRate || "",

                availabilityStatus:
                    response.data.availabilityStatus || "",

                verificationStatus:
                    response.data.verificationStatus || ""

            });


            setMessage(
                "Profile updated successfully!"
            );

        } catch (err) {

            console.error(
                "Error updating profile:",
                err
            );

            setError(
                "Unable to update your profile."
            );

        } finally {

            setSaving(false);
        }
    };


    // ==========================================
    // LOADING SCREEN
    // ==========================================

    if (loading) {

        return (
            <div className="student-profile-page">

                <div className="profile-loading">

                    <h2>
                        Loading Profile...
                    </h2>

                </div>

            </div>
        );
    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="student-profile-page">

            {/* ======================================
                TOP BAR
            ====================================== */}

            <div className="student-profile-topbar">

                <button
                    className="profile-back-button"
                    onClick={() =>
                        navigate("/student-dashboard")
                    }
                >
                    ← Back to Dashboard
                </button>

                <h1>
                    My Profile
                </h1>

            </div>


            {/* ======================================
                MAIN PROFILE CONTAINER
            ====================================== */}

            <div className="student-profile-container">


                {/* ==================================
                    PROFILE HEADER
                ================================== */}

                <div className="profile-header-card">

                    <div className="profile-avatar">

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


                    <div className="profile-header-info">

                        <h2>
                            {profile.name || "Student"}
                        </h2>

                        <p>
                            {profile.course ||
                                "Student"}
                        </p>

                        <p>
                            {profile.location ||
                                "Location not added"}
                        </p>

                    </div>


                    <div className="verification-badge">

                        {profile.verificationStatus ===
                        "VERIFIED"
                            ? "✓ Verified"
                            : profile.verificationStatus ||
                              "PENDING"}

                    </div>

                </div>


                {/* ==================================
                    SUCCESS / ERROR MESSAGE
                ================================== */}

                {message && (

                    <div className="profile-success">

                        {message}

                    </div>

                )}


                {error && (

                    <div className="profile-error">

                        {error}

                    </div>

                )}


                {/* ==================================
                    PROFILE FORM
                ================================== */}

                <form
                    className="student-profile-form"
                    onSubmit={handleSave}
                >


                    {/* ==============================
                        PERSONAL INFORMATION
                    ============================== */}

                    <div className="profile-section">

                        <h2>
                            Personal Information
                        </h2>

                        <div className="profile-grid">


                            <div className="profile-field">

                                <label>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                />

                            </div>


                            <div className="profile-field">

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled
                                />

                                <small>
                                    Email cannot be changed.
                                </small>

                            </div>


                            <div className="profile-field">

                                <label>
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                />

                            </div>


                            <div className="profile-field">

                                <label>
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    value={profile.location}
                                    onChange={handleChange}
                                    placeholder="Enter your location"
                                />

                            </div>

                        </div>

                    </div>


                    {/* ==============================
                        EDUCATION
                    ============================== */}

                    <div className="profile-section">

                        <h2>
                            Education
                        </h2>

                        <div className="profile-grid">


                            <div className="profile-field">

                                <label>
                                    College Name
                                </label>

                                <input
                                    type="text"
                                    name="collegeName"
                                    value={profile.collegeName}
                                    onChange={handleChange}
                                    placeholder="Enter college name"
                                />

                            </div>


                            <div className="profile-field">

                                <label>
                                    Course
                                </label>

                                <input
                                    type="text"
                                    name="course"
                                    value={profile.course}
                                    onChange={handleChange}
                                    placeholder="Example: B.Tech ENTC"
                                />

                            </div>


                            <div className="profile-field">

                                <label>
                                    Year of Study
                                </label>

                                <select
                                    name="yearOfStudy"
                                    value={profile.yearOfStudy}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Year
                                    </option>

                                    <option value="1">
                                        First Year
                                    </option>

                                    <option value="2">
                                        Second Year
                                    </option>

                                    <option value="3">
                                        Third Year
                                    </option>

                                    <option value="4">
                                        Fourth Year
                                    </option>

                                </select>

                            </div>


                            <div className="profile-field">

                                <label>
                                    Education
                                </label>

                                <input
                                    type="text"
                                    name="education"
                                    value={profile.education}
                                    onChange={handleChange}
                                    placeholder="Example: Bachelor of Technology"
                                />

                            </div>

                        </div>

                    </div>


                    {/* ==============================
                        ABOUT
                    ============================== */}

                    <div className="profile-section">

                        <h2>
                            About Me
                        </h2>

                        <div className="profile-field">

                            <label>
                                Bio
                            </label>

                            <textarea
                                name="bio"
                                value={profile.bio}
                                onChange={handleChange}
                                placeholder="Tell clients about yourself..."
                                rows="5"
                            />

                        </div>

                    </div>


                    {/* ==============================
                        PROFESSIONAL INFORMATION
                    ============================== */}

                    <div className="profile-section">

                        <h2>
                            Freelancing Information
                        </h2>

                        <div className="profile-grid">


                            <div className="profile-field">

                                <label>
                                    Hourly Rate (₹)
                                </label>

                                <input
                                    type="number"
                                    name="hourlyRate"
                                    value={profile.hourlyRate}
                                    onChange={handleChange}
                                    placeholder="Example: 500"
                                    min="0"
                                    step="0.01"
                                />

                            </div>


                            <div className="profile-field">

                                <label>
                                    Availability
                                </label>

                                <select
                                    name="availabilityStatus"
                                    value={
                                        profile.availabilityStatus
                                    }
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Availability
                                    </option>

                                    <option value="AVAILABLE">
                                        Available
                                    </option>

                                    <option value="BUSY">
                                        Busy
                                    </option>

                                    <option value="NOT_AVAILABLE">
                                        Not Available
                                    </option>

                                </select>

                            </div>


                            <div className="profile-field">

                                <label>
                                    Verification Status
                                </label>

                                <input
                                    type="text"
                                    value={
                                        profile.verificationStatus ||
                                        "PENDING"
                                    }
                                    disabled
                                />

                                <small>
                                    Verification status is managed by the platform.
                                </small>

                            </div>

                        </div>

                    </div>


                    {/* ==============================
                        PROFILE PICTURE
                    ============================== */}

                    <div className="profile-section">

                        <h2>
                            Profile Picture
                        </h2>

                        <div className="profile-field">

                            <label>
                                Profile Picture URL
                            </label>

                            <input
                                type="text"
                                name="profilePicture"
                                value={
                                    profile.profilePicture
                                }
                                onChange={handleChange}
                                placeholder="Enter image URL"
                            />

                            <small>
                                Actual image upload will be added later.
                            </small>

                        </div>

                    </div>


                    {/* ==============================
                        SAVE BUTTON
                    ============================== */}

                    <div className="profile-actions">

                        <button
                            type="button"
                            className="cancel-profile-button"
                            onClick={() =>
                                navigate("/student-dashboard")
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-profile-button"
                            disabled={saving}
                        >

                            {saving
                                ? "Saving..."
                                : "Save Profile"}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default StudentProfile;