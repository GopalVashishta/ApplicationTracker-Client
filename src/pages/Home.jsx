import { Link } from "react-router-dom";

const FeatureCard = ({ title, desc, icon }) => (
    <div className="col-md-4 text-center mb-5">
        <div className="mb-4 display-4">{icon}</div>
        <h3 className="fw-bold mb-3 h4 uppercase tracking-tight">{title}</h3>
        <p className="text-secondary leading-relaxed mb-4 px-lg-4">{desc}</p>
        <button className="btn btn-link text-warning fw-bold text-decoration-none p-0 mt-3 border-bottom border-warning border-2 border-opacity-25 pb-1">
            Read more →
        </button>
    </div>
);

function Home() {
    return (
        <>
            <div className="bg-white w-100 m-0 p-0">
                {/* 1. HERO SECTION - Reduced padding from py-20/32 to py-12/16 */}
                <section className="py-12 lg:py-16 border-bottom w-100">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 mb-4 mb-lg-0">
                                {/* Decreased heading from display-4 to h2 */}
                                <h2 className="fw-black text-dark mb-3">
                                    Track your job hunt <br />
                                    <span className="text-warning underline decoration-4">without the stress.</span>
                                </h2>
                                {/* Decreased text from lead to standard p */}
                                <p className="text-secondary mb-4">
                                    A simple MERN application to manage your job applications,
                                    track interview dates, and organize your career move in one place.
                                </p>
                                <div className="d-flex gap-2">
                                    {/* Removed btn-lg and reduced px-5 to px-4 */}
                                    <button className="btn btn-warning fw-bold px-4 shadow-sm">
                                        Get Started
                                    </button>
                                    <button className="btn btn-outline-dark fw-bold px-4">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                {/* Reduced padding from p-5 to p-4 */}
                                <div className="bg-light rounded-4 border p-4 text-center shadow-sm">
                                    <div className="h3 mb-2 text-warning">📊</div>
                                    <h5 className="fw-bold text-dark text-uppercase tracking-tighter">Dashboard Preview</h5>
                                    <p className="text-muted mb-0 small uppercase fw-bold tracking-wider">Interface Coming Soon</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. SIMPLE STATS - Reduced py-12 to py-8 */}
                <section className="py-8 bg-light w-100 mt-4 mb-4">
                    <div className="container">
                        <div className="row text-center g-4">
                            <div className="col-md-4">
                                <h3 className="fw-black mb-0">10k+</h3>
                                <p className="text-muted small fw-bold">Applications Tracked</p>
                            </div>
                            <div className="col-md-4 border-start border-end">
                                <h3 className="fw-black mb-0 text-warning">500+</h3>
                                <p className="text-muted small fw-bold">Daily Active Users</p>
                            </div>
                            <div className="col-md-4">
                                <h3 className="fw-black mb-0 text-dark">24/7</h3>
                                <p className="text-muted small fw-bold">MERN Performance</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. BASIC FEATURES SECTION - Reduced padding and heading sizes */}
                <section className="py-16 w-100">
                    <div className="container text-center mb-4 pb-2">
                        <h3 className="fw-black">Simple tools for big results</h3>
                        <p className="text-muted">Everything you need to stay organized.</p>
                    </div>

                    <div className="container">
                        <div className="row g-4">
                            <FeatureCard title="Kanban Board" desc="Drag and drop applications." icon="📋" />
                            <FeatureCard title="Real-time Updates" desc="Fast MERN stack performance." icon="⚡" />
                            <FeatureCard title="Interview Prep" desc="Keep detailed notes." icon="📝" />
                        </div>
                    </div>
                </section>

                {/* 4. REFINED CALL TO ACTION - Reduced scale, padding, and font sizes */}
                <section className="py-4 my-4 w-100 bg-white">
                    <div className="container px-4">
                        <div className="bg-dark text-white shadow-lg mx-auto max-w-4xl border border-warning border-opacity-10"
                            style={{
                                borderRadius: '40px', // Reduced from 80px
                                padding: '30px 20px', // Reduced from 40/30
                                borderWidth: '6px'    // Reduced from 12px
                            }}>

                            <div className="mb-3">
                                <span className="badge bg-warning text-dark px-3 py-1 rounded-pill fw-bold text-uppercase small shadow-sm">
                                    Limited Beta
                                </span>
                            </div>

                            {/* Reduced from display-3 to h3 */}
                            <h3 className="fw-bold mb-3">
                                Ready to <span className="text-warning">land that job?</span>
                            </h3>

                            <p className="text-white opacity-75 mb-4 mx-auto small" style={{ maxWidth: '500px' }}>
                                Join thousands of users who have streamlined their job hunt today.
                            </p>

                            <div className="mt-3">
                                {/* Removed btn-lg and custom inline fontSize */}
                                <button className="btn btn-warning fw-black px-4 py-2 rounded-pill shadow-lg transform transition hover:scale-105">
                                    Create Free Account
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    );
};

export default Home;