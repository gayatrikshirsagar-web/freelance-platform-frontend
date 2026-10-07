import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
function LandingPage() {
    const navigate = useNavigate();
    return (
        <div className="landing-page">

            {/* ================= NAVBAR ================= */}
            <nav className="navbar">

                <div className="logo">
                    Freelance<span>Hub</span>
                </div>

                <div className="nav-links">
                    <a href="#home">Home</a>
                    <a href="#how-it-works">How It Works</a>
                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                </div>

                <div className="nav-actions">
                    <button
    className="login-button"
    onClick={() => navigate("/login")}
>
    Login
</button>

                    <button
    className="signup-button"
    onClick={() => navigate("/register")}
>
    Get Started
</button>
                </div>

            </nav>


            {/* ================= HERO SECTION ================= */}
            <section className="hero-section" id="home">

                <div className="hero-content">

                    <div className="hero-tag">
                        ✨ The Future of Freelancing
                    </div>

                    <h1>
                        Where Great
                        <span> Talent </span>
                        Meets Great
                        <span> Opportunity.</span>
                    </h1>

                    <p>
                        Connect with talented freelancers, discover exciting
                        projects, build your portfolio, and turn your skills
                        into real opportunities.
                    </p>

                    <div className="hero-buttons">

                        <button className="primary-button">
                            Find Work
                            <span>→</span>
                        </button>

                        <button className="secondary-button">
                            Hire Talent
                        </button>

                    </div>

                    <div className="trust-text">
                        Trusted by students, freelancers and businesses
                    </div>

                    <div className="hero-stats">

                        <div className="stat">
                            <h3>500+</h3>
                            <p>Freelancers</p>
                        </div>

                        <div className="stat">
                            <h3>200+</h3>
                            <p>Projects</p>
                        </div>

                        <div className="stat">
                            <h3>100+</h3>
                            <p>Clients</p>
                        </div>

                    </div>

                </div>


                {/* ================= HERO VISUAL ================= */}

                <div className="hero-visual">

                    <div className="glow-circle"></div>

                    <div className="profile-card">

                        <div className="profile-top">

                            <div className="profile-avatar">
                                👩🏻‍💻
                            </div>

                            <div>
                                <h4>Top Freelancer</h4>
                                <p>Available for work</p>
                            </div>

                            <div className="online">
                                ●
                            </div>

                        </div>

                        <div className="profile-info">

                            <h2>Creative Developer</h2>

                            <p>
                                Full Stack Developer
                            </p>

                            <div className="rating">
                                ⭐ <strong>4.9</strong>
                                <span> (120 reviews)</span>
                            </div>

                        </div>

                        <div className="skills">

                            <span>React</span>
                            <span>Java</span>
                            <span>Spring Boot</span>

                        </div>

                        <button className="view-profile">
                            View Profile
                        </button>

                    </div>


                    {/* Floating card 1 */}

                    <div className="floating-card project-card">

                        <div className="floating-icon">
                            💼
                        </div>

                        <div>
                            <strong>New Project</strong>
                            <p>Web Development</p>
                        </div>

                    </div>


                    {/* Floating card 2 */}

                    <div className="floating-card completed-card">

                        <div className="check-icon">
                            ✓
                        </div>

                        <div>
                            <strong>Project Completed</strong>
                            <p>Successfully delivered</p>
                        </div>

                    </div>

                </div>

            </section>


            {/* ================= HOW IT WORKS ================= */}

            <section className="how-section" id="how-it-works">

                <div className="section-heading">

                    <div className="section-tag">
                        HOW IT WORKS
                    </div>

                    <h2>
                        Start Freelancing in
                        <span> 3 Simple Steps</span>
                    </h2>

                    <p>
                        Everything you need to start your freelance journey
                        and connect with the right opportunities.
                    </p>

                </div>


                <div className="steps-container">

                    <div className="step-card">

                        <div className="step-number">
                            01
                        </div>

                        <div className="step-icon">
                            👤
                        </div>

                        <h3>Create Your Profile</h3>

                        <p>
                            Build your professional profile and showcase
                            your skills, experience and portfolio.
                        </p>

                    </div>


                    <div className="step-card">

                        <div className="step-number">
                            02
                        </div>

                        <div className="step-icon">
                            🔍
                        </div>

                        <h3>Find Opportunities</h3>

                        <p>
                            Discover projects and freelance opportunities
                            that match your skills and interests.
                        </p>

                    </div>


                    <div className="step-card">

                        <div className="step-number">
                            03
                        </div>

                        <div className="step-icon">
                            🚀
                        </div>

                        <h3>Work & Grow</h3>

                        <p>
                            Complete projects, earn money, gain experience
                            and build a strong professional reputation.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= FEATURES ================= */}

            <section className="features-section" id="features">

                <div className="section-heading">

                    <div className="section-tag">
                        WHY FREELANCEHUB
                    </div>

                    <h2>
                        Everything You Need to
                        <span> Succeed</span>
                    </h2>

                    <p>
                        A platform designed to help freelancers and clients
                        work together effectively.
                    </p>

                </div>


                <div className="features-grid">

                    <div className="feature-card">

                        <div className="feature-icon">
                            🎓
                        </div>

                        <h3>Student Friendly</h3>

                        <p>
                            Gain real-world experience while studying
                            and build a strong professional portfolio.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            🤝
                        </div>

                        <h3>Trusted Connections</h3>

                        <p>
                            Connect talented freelancers with clients
                            looking for quality work.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            💼
                        </div>

                        <h3>Real Projects</h3>

                        <p>
                            Work on meaningful projects that help you
                            develop practical industry skills.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            🔒
                        </div>

                        <h3>Secure Platform</h3>

                        <p>
                            Secure communication, project management
                            and payment tracking.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= CTA ================= */}

            <section className="cta-section">

                <div className="cta-content">

                    <div className="cta-tag">
                        GET STARTED TODAY
                    </div>

                    <h2>
                        Your Next Opportunity
                        <span> Starts Here.</span>
                    </h2>

                    <p>
                        Whether you're looking for work or searching
                        for talented people, FreelanceHub is the place
                        to make it happen.
                    </p>

                    <button className="cta-button">
                        Join FreelanceHub →
                    </button>

                </div>

            </section>


            {/* ================= FOOTER ================= */}

            <footer className="footer">

                <div className="footer-main">

                    <div className="footer-brand">

                        <div className="logo">
                            Freelance<span>Hub</span>
                        </div>

                        <p>
                            Connecting talent with opportunity
                            and helping ideas become reality.
                        </p>

                    </div>


                    <div className="footer-column">

                        <h4>Platform</h4>

                        <a href="#home">Home</a>
                        <a href="#features">Features</a>
                        <a href="#how-it-works">How It Works</a>

                    </div>


                    <div className="footer-column">

                        <h4>For Users</h4>

                        <a href="#home">Find Work</a>
                        <a href="#home">Hire Talent</a>
                        <a href="#home">Create Profile</a>

                    </div>


                    <div className="footer-column">

                        <h4>Company</h4>

                        <a href="#about">About Us</a>
                        <a href="#home">Contact</a>
                        <a href="#home">Privacy</a>

                    </div>

                </div>


                <div className="footer-bottom">

                    <p>
                        © 2026 FreelanceHub. All rights reserved.
                    </p>

                    <p>
                        Built with React & Spring Boot
                    </p>

                </div>

            </footer>

        </div>
    );
}

export default LandingPage;