import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useState } from 'react';
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100 py-5">
        <div className="card border-0 shadow-lg p-5 rounded-4" style={{ maxWidth: '450px', width: '100%' }}>
          <h2 className="text-center fw-bold mb-2">Create Account</h2>
          <p className="text-center text-muted mb-4">Join our community today</p>

          <form>
            {/* Full Name Field */}
            <div className="mb-3">
              <label className="form-label small fw-semibold">Full Name</label>
              <input type="text" className="form-control rounded-pill px-3" placeholder="John Doe" required />
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label small fw-semibold">Email address</label>
              <input type="email" className="form-control rounded-pill px-3" placeholder="name@example.com" required />
            </div>

            {/* Password Fields */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label small fw-semibold">Password</label>
                <input type="password" className="form-control rounded-pill px-3" placeholder="••••••••" required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label small fw-semibold">Confirm</label>
                <input type="password" className="form-control rounded-pill px-3" placeholder="••••••••" required />
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
              <GoogleLogin onSuccess={console.log('Google login successful')} onError={console.log('Google login error')} theme='outline' shape='pill' text='signin_with' />
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