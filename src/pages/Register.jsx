import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';

const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '', fullName: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

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
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
          username: formData.fullName,
          email: formData.email,
          password: formData.password
        };
        const config = { withCredentials: true };
        const res = await axios.post(`${serverEndpoint}/auth/register`, body, config);
        console.log(res);
        setMessage("User Registered");
        Navigate("/login");
      } catch (error) {
        console.log("Error during registration:", error);
        setErrors({ message: error.status === 401 ? "Please log in via Google" : "Registration failed. Please try again." });
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
      //dispatch({ type: SET_USER, payload: resp.data.user });
      setMessage("User Registered");
      setUserDetails(res.data.user);
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
        <div className="card border-0 shadow-lg p-5 rounded-4" style={{ maxWidth: '450px', width: '100%' }}>
          <h2 className="text-center fw-bold mb-2">Create Account</h2>
          <p className="text-center text-muted mb-4">Join our community today</p>

          {message && <div className="alert alert-success">{message}</div>}
          {errors.message && <div className="alert alert-danger">{errors.message}</div>}

          <form onSubmit={handleFormSubmit}>
            {/* Full Name Field */}
            <div className="mb-3">
              <label className="form-label small fw-semibold">Full Name</label>
              <input type="text" className="form-control rounded-pill px-3" placeholder="John Doe" required onChange={handleChange} name="fullName" />
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label small fw-semibold">Email address</label>
              <input type="email" className="form-control rounded-pill px-3" placeholder="name@example.com" onChange={handleChange} name="email" required />
            </div>

            {/* Password Fields */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label small fw-semibold">Password</label>
                <input type="password" className="form-control rounded-pill px-3" placeholder="••••••••" onChange={handleChange} name="password" required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label small fw-semibold">Confirm</label>
                <input type="password" className="form-control rounded-pill px-3" placeholder="••••••••" onChange={handleChange} name="confirmPassword" required />
              </div>
            </div>

            <div className="form-check mb-4 small">
              <input className="form-check-input" type="checkbox" id="terms" required />
              <label className="form-check-label text-muted" htmlFor="terms">
                I agree to the <a href="#" className="text-decoration-none">Terms & Conditions</a>
              </label>
            </div>

            <button type="submit" className="btn btn-success w-100 rounded-pill py-2 fw-semibold shadow-sm">
              Sign Up
            </button>
          </form>

          <div className="text-center my-3 text-muted">
            <small>OR REGISTER WITH</small>
          </div>

          {/* Google Signup Integration */}
          <div className="d-flex justify-content-center">
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> {/* Like BrowserRouter in main.jsx */}
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} theme='outline' shape='pill' text='signin_with' />
            </GoogleOAuthProvider>
          </div>

          <p className="text-center mt-4 mb-0 small">
            Already have an account? <Link to="/login" className="text-primary text-decoration-none fw-bold">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;