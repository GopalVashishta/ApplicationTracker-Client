import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function UserFooter() {
    const userDetails = useSelector((state) => state.userDetails);
    const displayName = userDetails?.fullName || userDetails?.name || 'User';

    return (
        <footer className="bg-dark text-white pt-4 pb-2 mt-auto">
            <div className="container text-center text-md-start">
                <div className="row text-center text-md-start">
                    <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
                            JOB<span className="text-white">APP</span>TKR
                        </h5>
                        <p>Welcome back, {displayName}. Manage your work and stay on track.</p>
                    </div>

                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold">Quick Links</h5>
                        <p><Link to="/dashboard" className="text-white text-decoration-none">Dashboard</Link></p>
                        <p><Link to="/projects" className="text-white text-decoration-none">Projects</Link></p>
                        <p><Link to="/team" className="text-white text-decoration-none">Team</Link></p>
                    </div>

                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold">Support</h5>
                        <p><i className="fas fa-envelope mr-3"></i> support@jobapptkr.com</p>
                        <p><i className="fas fa-phone mr-3"></i> +91 98765 XXXXX</p>
                    </div>
                </div>

                <hr className="mb-4" />

                <div className="row align-items-center">
                    <div className="col-md-7 col-lg-8">
                        <p>© {new Date().getFullYear()} All Rights Reserved by:
                            <span className="text-warning" style={{ textDecoration: 'none' }}> JOB<span className="text-white">APP</span>TKR</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default UserFooter;