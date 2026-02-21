import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_USER } from "../redux/user/action";

const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

function UserHeader() {
    const userDetails = useSelector((state) => state.userDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(`${serverEndpoint}/auth/logout`, {}, { withCredentials: true });
            document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            dispatch({ type: CLEAR_USER }); // inform redux to clear userDetails
            navigate('/login');
        }
        catch (error) {
            console.log("Logout failed: ", error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-dark border-bottom py-2">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold text-warning" to="/">
                    JOB<span className="text-white">APP</span>TKR
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link text-secondary">
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/projects" className="nav-link text-secondary">
                                Projects
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/team" className="nav-link text-secondary">
                                Team
                            </Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle d-flex align-items-center border rounded-pill px-3 py-1 shadow-sm text-white bg-dark"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ minWidth: '180px' }}
                            >
                                <div className="bg-warning text-white rounded-circle d-flex justify-content-center align-items-center fw-bold me-2"
                                    style={{ width: '32px', height: '32px', fontSize: '14px' }}>
                                    {userDetails?.name ? userDetails.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div className="text-start flex-grow-1">
                                    <div className="fw-bold text-white small">{userDetails?.name || 'Account'}</div>
                                    <div className="text-uppercase text-warning" style={{ fontSize: '10px' }}>{userDetails?.role}</div>
                                </div>
                            </a>

                            <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2 rounded-3">
                                <li className="px-3 py-2 border-bottom mb-1" style={{ minWidth: '200px' }}>
                                    <p className="mb-0 small fw-bold text-dark">Signed in as</p>
                                    <p className="mb-0 small text-muted">{userDetails?.email || userDetails?.name}</p>
                                </li>
                                <li>
                                    <button className="dropdown-item py-2 text-danger fw-bold" onClick={() => handleLogout()}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default UserHeader;