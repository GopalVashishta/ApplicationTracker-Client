import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useState } from 'react';
import { Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in with:", formData);
        // Here is where you would call: axios.post('/api/login', formData)
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="card shadow-lg border-0 p-4 p-md-5 rounded-4" style={{ maxWidth: '400px', width: '100%' }}>

                    <div className="text-center mb-4">
                        <h2 className="fw-bold text-dark">Welcome Back</h2>
                        <p className="text-muted small">Login to manage your account</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Email Address</label>
                            <input
                                type="email"
                                className="form-control rounded-pill px-3 py-2"
                                placeholder="email@example.com"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label className="form-label small fw-bold">Password</label>
                            <input
                                type="password"
                                className="form-control rounded-pill px-3 py-2"
                                placeholder="••••••••"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 fw-bold shadow-sm mb-3">
                            Sign In
                        </button>
                    </form>

                    <div className="d-flex align-items-center my-3">
                        <hr className="flex-grow-1" />
                        <span className="mx-2 text-muted small">OR</span>
                        <hr className="flex-grow-1" />
                    </div>

                    {/* Google Login Button */}
                    <div className="d-flex justify-content-center">
                        <div className="d-flex justify-content-center">
                            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> {/* Like BrowserRouter in main.jsx */}
                                <GoogleLogin onSuccess={console.log('googleLogin')} onError={console.log('googleLogin error')} theme='outline' shape='pill' text='signin_with' />
                            </GoogleOAuthProvider>
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <p className="small mb-0">
                            Don't have an account? <Link to="/register" className="text-decoration-none fw-bold">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;