import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

function ChangePassword() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
        otp: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        try {
            if (formData.email.trim() === '' || formData.newPassword.trim() === '' || formData.otp.trim() === '') {
                setErrors({ message: 'All fields are required.' });
                return;
            }
            const body = {
                email: event.target.email.value,
                newPassword: event.target.newPassword.value,
                otp: event.target.otp.value
            };
            const res = await axios.post(`${serverEndpoint}/auth/change-password`, body, { withCredentials: true });
            setMessage(res.data.message);
            //setTimeout(() => { setMessage('You will be redirected in a few seconds'); }, 5000);
            navigate('/login');
        } catch (error) {
            setErrors(error.response.data.errors || { message: error.response.data.message });
        }
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center min-vh-50 py-5">
                <div className="card border-0 shadow-lg p-5 rounded-4" style={{ maxWidth: '450px', width: '100%' }}>
                    <h2 className="text-center fw-bold mb-2">Change Password</h2>

                    {message && <div className="alert alert-success">{message}</div>}
                    {errors.message && <div className="alert alert-danger">{errors.message}</div>}

                    <form onSubmit={handleFormSubmit}>

                        {/* Email Field */}
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Email address</label>
                            <input type="email" value={formData.email} className="form-control rounded-pill px-3" placeholder="name@example.com" onChange={handleChange} name="email" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">New Password</label>
                            <input type="password" className="form-control rounded-pill px-3" placeholder="Enter new password" onChange={handleChange} name="newPassword" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">OTP</label>
                            <input type="text" value={formData.otp} className="form-control rounded-pill px-3" placeholder="Enter OTP" onChange={handleChange} name="otp" required />
                        </div>

                        <button type="submit" className="btn btn-warning w-100 rounded-pill py-2 fw-semibold shadow-sm">
                            Change Password
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;