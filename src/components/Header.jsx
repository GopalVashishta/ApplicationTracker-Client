import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 shadow-sm sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold text-warning" to="/">
                        JOB<span className="text-white">APP</span>TKR
                    </Link>

                    {/* 2. Update button to use onClick */}
                    <button
                        className="navbar-toggler border-0"
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* 3. Use Tailwind and Bootstrap classes to handle the "disappearing" act */}
                    <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-center">
                            <li className="nav-item">
                                <Link className="nav-link px-3" to="/" onClick={() => setIsOpen(false)}>Home</Link>
                            </li>
                            <li className="nav-item ms-lg-2 mt-2 mt-lg-0 w-100 w-lg-auto">
                                <Link className="btn btn-warning rounded-pill px-4 w-100" to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                            </li>
                            <li className="nav-item ms-lg-2 mt-2 mt-lg-0 w-100 w-lg-auto">
                                <Link
                                    className="btn btn-warning rounded-pill px-4 w-100"
                                    to="/register"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;