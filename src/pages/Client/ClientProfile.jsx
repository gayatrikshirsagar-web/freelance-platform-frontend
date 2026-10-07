import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./ClientProfile.css";

function ClientProfile() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        userId: "",
        clientId: "",
        name: "",
        email: "",
        phone: "",
        profilePicture: "",
        companyName: "",
        companyDescription: "",
        companyWebsite: "",
        location: "",
        clientType: "",
        verificationStatus: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const userId =
        localStorage.getItem("userId");


    // ==================================
    // LOAD PROFILE
    // ==================================

    useEffect(() => {

        if (!userId) {

            setError(
                "User is not logged in."
            );

            setLoading(false);

            return;
        }

        loadProfile();

    }, [userId]);


    const loadProfile = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await api.get(
                    `/client-profile/${userId}`
                );


            setProfile({

                userId:
                    response.data.userId || "",

                clientId:
                    response.data.clientId || "",

                name:
                    response.data.name || "",

                email:
                    response.data.email || "",

                phone:
                    response.data.phone || "",

                profilePicture:
                    response.data.profilePicture || "",

                companyName:
                    response.data.companyName || "",

                companyDescription:
                    response.data.companyDescription || "",

                companyWebsite:
                    response.data.companyWebsite || "",

                location:
                    response.data.location || "",

                clientType:
                    response.data.clientType || "",

                verificationStatus:
                    response.data.verificationStatus || ""
            });

        }
        catch (err) {

            console.error(
                "Error loading client profile:",
                err
            );

            setError(
                "Unable to load your profile."
            );

        }
        finally {

            setLoading(false);
        }
    };


    // ==================================
    // HANDLE INPUT
    // ==================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setProfile(
            previousProfile => ({

                ...previousProfile,

                [name]: value
            })
        );
    };


    // ==================================
    // SAVE PROFILE
    // ==================================

    const handleSave = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);

            setMessage("");
            setError("");


            const updateData = {

                name:
                    profile.name,

                phone:
                    profile.phone,

                profilePicture:
                    profile.profilePicture,

                companyName:
                    profile.companyName,

                companyDescription:
                    profile.companyDescription,

                companyWebsite:
                    profile.companyWebsite,

                location:
                    profile.location,

                clientType:
                    profile.clientType
            };


            const response =
                await api.put(
                    `/client-profile/${userId}`,
                    updateData
                );


            setProfile({

                userId:
                    response.data.userId || "",

                clientId:
                    response.data.clientId || "",

                name:
                    response.data.name || "",

                email:
                    response.data.email || "",

                phone:
                    response.data.phone || "",

                profilePicture:
                    response.data.profilePicture || "",

                companyName:
                    response.data.companyName || "",

                companyDescription:
                    response.data.companyDescription || "",

                companyWebsite:
                    response.data.companyWebsite || "",

                location:
                    response.data.location || "",

                clientType:
                    response.data.clientType || "",

                verificationStatus:
                    response.data.verificationStatus || ""
            });


            setMessage(
                "Company profile updated successfully!"
            );

        }
        catch (err) {

            console.error(
                "Error updating client profile:",
                err
            );

            setError(
                "Unable to update your profile."
            );

        }
        finally {

            setSaving(false);
        }
    };


    // ==================================
    // LOADING SCREEN
    // ==================================

    if (loading) {

        return (

            <div className="client-profile-page">

                <div className="client-profile-loading">

                    <h2>
                        Loading Profile...
                    </h2>

                </div>

            </div>
        );
    }


    return (

        <div className="client-profile-page">

            {/* ============================
                TOP BAR
            ============================ */}

            <div className="client-profile-topbar">

                <button
                    className="client-profile-back-button"
                    onClick={() =>
                        navigate("/client-dashboard")
                    }
                >
                    ← Back to Dashboard
                </button>


                <h1>
                    Company Profile
                </h1>

            </div>


            <div className="client-profile-container">


                {/* ============================
                    PROFILE HEADER
                ============================ */}

                <div className="client-profile-header-card">

                    <div className="client-profile-avatar">

                        {profile.profilePicture ? (

                            <img
                                src={
                                    profile.profilePicture
                                }
                                alt="Company Profile"
                            />

                        ) : (

                            <span>

                                {profile.companyName

                                    ? profile.companyName
                                        .charAt(0)
                                        .toUpperCase()

                                    : "C"}

                            </span>
                        )}

                    </div>


                    <div className="client-profile-header-info">

                        <h2>

                            {profile.companyName ||
                                "Company"}

                        </h2>


                        <p>

                            {profile.clientType ||
                                "Client"}

                        </p>


                        <p>

                            {profile.location ||
                                "Location not added"}

                        </p>

                    </div>


                    <div className="client-verification-badge">

                        {profile.verificationStatus ===
                        "VERIFIED"

                            ? "✓ Verified"

                            : profile.verificationStatus ||
                              "PENDING"}

                    </div>

                </div>


                {/* ============================
                    MESSAGES
                ============================ */}

                {message && (

                    <div className="client-profile-success">

                        {message}

                    </div>
                )}


                {error && (

                    <div className="client-profile-error">

                        {error}

                    </div>
                )}


                {/* ============================
                    FORM
                ============================ */}

                <form
                    className="client-profile-form"
                    onSubmit={handleSave}
                >


                    {/* ============================
                        PERSONAL INFORMATION
                    ============================ */}

                    <div className="client-profile-section">

                        <h2>
                            Personal Information
                        </h2>


                        <div className="client-profile-grid">


                            <div className="client-profile-field">

                                <label>
                                    Contact Person Name
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


                            <div className="client-profile-field">

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


                            <div className="client-profile-field">

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


                            <div className="client-profile-field">

                                <label>
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    value={profile.location}
                                    onChange={handleChange}
                                    placeholder="Enter company location"
                                />

                            </div>

                        </div>

                    </div>


                    {/* ============================
                        COMPANY INFORMATION
                    ============================ */}

                    <div className="client-profile-section">

                        <h2>
                            Company Information
                        </h2>


                        <div className="client-profile-grid">


                            <div className="client-profile-field">

                                <label>
                                    Company Name
                                </label>

                                <input
                                    type="text"
                                    name="companyName"
                                    value={
                                        profile.companyName
                                    }
                                    onChange={handleChange}
                                    placeholder="Enter company name"
                                    required
                                />

                            </div>


                            <div className="client-profile-field">

                                <label>
                                    Client Type
                                </label>

                                <select
                                    name="clientType"
                                    value={
                                        profile.clientType
                                    }
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Client Type
                                    </option>

                                    <option value="Company">
                                        Company
                                    </option>

                                    <option value="Startup">
                                        Startup
                                    </option>

                                    <option value="Individual">
                                        Individual
                                    </option>

                                    <option value="Organization">
                                        Organization
                                    </option>

                                </select>

                            </div>


                            <div className="client-profile-field">

                                <label>
                                    Company Website
                                </label>

                                <input
                                    type="text"
                                    name="companyWebsite"
                                    value={
                                        profile.companyWebsite
                                    }
                                    onChange={handleChange}
                                    placeholder="https://example.com"
                                />

                            </div>


                            <div className="client-profile-field">

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


                    {/* ============================
                        COMPANY DESCRIPTION
                    ============================ */}

                    <div className="client-profile-section">

                        <h2>
                            About Company
                        </h2>


                        <div className="client-profile-field">

                            <label>
                                Company Description
                            </label>

                            <textarea
                                name="companyDescription"
                                value={
                                    profile.companyDescription
                                }
                                onChange={handleChange}
                                placeholder="Tell freelancers about your company..."
                                rows="6"
                            />

                        </div>

                    </div>


                    {/* ============================
                        PROFILE PICTURE
                    ============================ */}

                    <div className="client-profile-section">

                        <h2>
                            Profile Picture
                        </h2>


                        <div className="client-profile-field">

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


                    {/* ============================
                        BUTTONS
                    ============================ */}

                    <div className="client-profile-actions">

                        <button
                            type="button"
                            className="client-cancel-button"
                            onClick={() =>
                                navigate(
                                    "/client-dashboard"
                                )
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="client-save-button"
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

export default ClientProfile;