import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./PostProject.css";

function PostProject() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [budgetMin, setBudgetMin] = useState("");
    const [budgetMax, setBudgetMax] = useState("");
    const [deadline, setDeadline] = useState("");
    const [requiredExperience, setRequiredExperience] = useState("");

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event) => {

        event.preventDefault();

        const userId = localStorage.getItem("userId");
        const role = localStorage.getItem("role");

        if (!userId) {
            alert("Please login first.");
            navigate("/login");
            return;
        }

        if (role !== "CLIENT") {
            alert("Only clients can post projects.");
            return;
        }

        if (!title.trim()) {
            alert("Please enter project title.");
            return;
        }

        if (!categoryId) {
            alert("Please select a category.");
            return;
        }

        if (!description.trim()) {
            alert("Please enter project description.");
            return;
        }

        if (!budgetMin || !budgetMax) {
            alert("Please enter minimum and maximum budget.");
            return;
        }

        if (Number(budgetMin) > Number(budgetMax)) {
            alert("Minimum budget cannot be greater than maximum budget.");
            return;
        }

        if (!deadline) {
            alert("Please select a deadline.");
            return;
        }

        if (!requiredExperience.trim()) {
            alert("Please enter required experience.");
            return;
        }

        const projectData = {

            userId: Number(userId),

            categoryId: Number(categoryId),

            title: title,

            description: description,

            budgetMin: Number(budgetMin),

            budgetMax: Number(budgetMax),

            deadline: deadline,

            requiredExperience: requiredExperience

        };

        console.log("Project data:", projectData);

        try {

            setSubmitting(true);

            const response = await api.post(
                "/gigs",
                projectData
            );

            console.log(
                "Project created:",
                response.data
            );

            alert("Project posted successfully!");

            navigate("/client-dashboard");

        } catch (error) {

            console.error(
                "Project creation error:",
                error
            );

            if (
                error.response &&
                error.response.data
            ) {

                alert(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : "Unable to post project."
                );

            } else {

                alert(
                    "Unable to post project. Please try again."
                );
            }

        } finally {

            setSubmitting(false);

        }
    };


    return (

        <div className="post-project-page">

            <div className="post-project-container">

                {/* HEADER */}

                <div className="post-project-header">

                    <div>

                        <h1>
                            Post a Project
                        </h1>

                        <p>
                            Tell us about your project and find the right freelancer.
                        </p>

                    </div>

                    <button
                        className="back-dashboard-button"
                        onClick={() =>
                            navigate("/client-dashboard")
                        }
                    >
                        ← Dashboard
                    </button>

                </div>


                {/* FORM */}

                <form
                    className="post-project-form"
                    onSubmit={handleSubmit}
                >

                    {/* PROJECT TITLE */}

                    <div className="form-group">

                        <label>
                            Project Title
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Build a React E-Commerce Website"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                        />

                    </div>


                    {/* CATEGORY */}

                    <div className="form-group">

                        <label>
                            Category
                        </label>

                        <select
                            value={categoryId}
                            onChange={(event) =>
                                setCategoryId(event.target.value)
                            }
                        >

                            <option value="">
                                Select Category
                            </option>

                            <option value="1">
                                Web Development
                            </option>

                            <option value="2">
                                Mobile Development
                            </option>

                            <option value="3">
                                UI/UX Design
                            </option>

                            <option value="4">
                                Java Development
                            </option>

                            <option value="5">
                                Python Development
                            </option>

                        </select>

                    </div>


                    {/* DESCRIPTION */}

                    <div className="form-group">

                        <label>
                            Project Description
                        </label>

                        <textarea
                            rows="6"
                            placeholder="Describe what you want the freelancer to build..."
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                        />

                    </div>


                    {/* BUDGET */}

                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Minimum Budget (₹)
                            </label>

                            <input
                                type="number"
                                min="0"
                                placeholder="10000"
                                value={budgetMin}
                                onChange={(event) =>
                                    setBudgetMin(event.target.value)
                                }
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Maximum Budget (₹)
                            </label>

                            <input
                                type="number"
                                min="0"
                                placeholder="20000"
                                value={budgetMax}
                                onChange={(event) =>
                                    setBudgetMax(event.target.value)
                                }
                            />

                        </div>

                    </div>


                    {/* DEADLINE */}

                    <div className="form-group">

                        <label>
                            Project Deadline
                        </label>

                        <input
                            type="date"
                            value={deadline}
                            onChange={(event) =>
                                setDeadline(event.target.value)
                            }
                        />

                    </div>


                    {/* EXPERIENCE */}

                    <div className="form-group">

                        <label>
                            Required Experience / Skills
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. React, JavaScript, REST API"
                            value={requiredExperience}
                            onChange={(event) =>
                                setRequiredExperience(
                                    event.target.value
                                )
                            }
                        />

                    </div>


                    {/* BUTTONS */}

                    <div className="post-project-actions">

                        <button
                            type="button"
                            className="cancel-project-button"
                            onClick={() =>
                                navigate("/client-dashboard")
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="submit-project-button"
                            disabled={submitting}
                        >

                            {submitting
                                ? "Posting..."
                                : "Post Project"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default PostProject;