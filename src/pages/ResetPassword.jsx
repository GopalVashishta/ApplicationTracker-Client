import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

function ResetPassword() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        try {
            if (formData.email.trim() === '') {
                setErrors({ message: 'Email is required.' });
                return;
            }
            const body = {
                email: event.target.email.value
            };
            const res = await axios.post(`${serverEndpoint}/auth/reset-password`, body, { withCredentials: true });
            setMessage(res.data.message + "\nPlease check your email for further instructions.");
            //setTimeout(() => { setMessage('You will be redirected in a few seconds'); }, 5000);
            navigate('/change-password');
        } catch (error) {
            setErrors(error.response.data.errors || { message: error.response.data.message });
        }
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center min-vh-50 py-5">
                <div className="card border-0 shadow-lg p-5 rounded-4" style={{ maxWidth: '450px', width: '100%' }}>
                    <h2 className="text-center fw-bold mb-2">Reset Password</h2>

                    {message && <div className="alert alert-success">{message}</div>}
                    {errors.message && <div className="alert alert-danger">{errors.message}</div>}

                    <form onSubmit={handleFormSubmit}>

                        {/* Email Field */}
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Email address</label>
                            <input type="email" value={formData.email} className="form-control rounded-pill px-3" placeholder="name@example.com" onChange={handleChange} name="email" required />
                        </div>

                        <button type="submit" className="btn btn-warning w-100 rounded-pill py-2 fw-semibold shadow-sm">
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;