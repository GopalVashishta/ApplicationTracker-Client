import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { SET_USER } from "../redux/user/action.js";

const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validate = () => {
        let newErrors = {};
        let isValid = true;
        if (formData.email.trim().length === 0) {
            newErrors.email = "Email is required";
            isValid = false;
        }

        if (formData.password.trim().length === 0) {
            newErrors.password = "Password is required";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();//prevent default behaviour i.e.  Page reload
        if (validate()) {
            try {
                const body = {
                    email: formData.email,
                    password: formData.password
                };
                const config = { withCredentials: true };
                const res = await axios.post(`${serverEndpoint}/auth/login`, body, config);
                console.log(res);
                //setUser(res.data.user);
                setMessage("User Authenticated");
                dispatch({ type: SET_USER, payload: res.data.user }); // inform redux about the new userDetails

            } catch (error) {
                console.log("Error during login:", error);
                setErrors({ message: error.status === 401 ? "Please log in via Google" : "Login failed. Please try again." });
            }
        } else {
            console.log("Invalid form");
        }
    };

    const handleGoogleSuccess = async (authResponse) => {
        try {
            const body = {
                idToken: authResponse?.credential
            };
            const res = await axios.post(`${serverEndpoint}/auth/google-auth`, body, { withCredentials: true });
            dispatch({ type: SET_USER, payload: res.data.user });
            setMessage("User Authenticated via Google SSO");
        } catch (error) {
            console.log("Error during Google SSO login:", error);
            setErrors({ message: "Google SSO login failed. Please try again." });
        }
    };

    const handleGoogleError = (error) => {
        console.log(error);
        setErrors({ message: "Something went wrong while performing google single sign-on" });
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center min-vh-100 py-5">
                <div className="card shadow-lg border-0 p-4 p-md-5 rounded-4" style={{ maxWidth: '450px', width: '100%' }}>

                    <div className="text-center mb-4">
                        <h2 className="fw-bold text-dark">Welcome Back</h2>
                        <p className="text-muted small">Login to manage your account</p>
                    </div>

                    {message && <div className="alert alert-success">{message}</div>}
                    {errors.message && <div className="alert alert-danger">{errors.message}</div>}

                    <form onSubmit={handleFormSubmit}>
                        {/* Email Input */}
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Email Address</label>
                            <input
                                type="email"
                                className="form-control rounded-pill px-3 py-2"
                                placeholder="email@example.com"
                                onChange={handleChange}
                                required
                                name='email'
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label className="form-label small fw-bold">Password</label>
                            <input
                                type="password"
                                className="form-control rounded-pill px-3 py-2"
                                placeholder="••••••••"
                                onChange={handleChange}
                                required
                                name='password'
                            />
                            <button type="button" className="btn btn-link p-0 mt-2 small" style={{ textDecoration: 'none' }}>
                                <Link to="/reset-password" className="text-decoration-none small">Forgot Password?</Link>
                            </button>
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
                                <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} theme='outline' shape='pill' text='signin_with' />
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