import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <footer className="bg-dark text-white pt-4 pb-2 mt-auto">
                <div className="container text-center text-md-start">
                    <div className="row text-center text-md-start">

                        {/* Section 1: Brand/Logo */}
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold text-primary">MyMERNApp</h5>
                            <p>Building modern full-stack applications with React and Node.js.</p>
                        </div>

                        {/* Section 2: Quick Links */}
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold">Quick Links</h5>
                            <p><Link to="/" className="text-white text-decoration-none">Home</Link></p>
                            <p><Link to="/login" className="text-white text-decoration-none">Login</Link></p>
                            <p><Link to="/register" className="text-white text-decoration-none">Register</Link></p>
                        </div>

                        {/* Section 3: Contact */}
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold">Contact</h5>
                            <p><i className="fas fa-envelope mr-3"></i> support@mernapp.com</p>
                            <p><i className="fas fa-phone mr-3"></i> +91 98765 XXXXX</p>
                        </div>
                    </div>

                    <hr className="mb-4" />

                    {/* Copyright Section */}
                    <div className="row align-items-center">
                        <div className="col-md-7 col-lg-8">
                            <p>© {new Date().getFullYear()} All Rights Reserved by:
                                <span className="text-primary" style={{ textDecoration: 'none' }}> **MyMERNApp**</span>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;