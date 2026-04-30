import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: ''
    });
    const [clientError, setClientError] = useState('');

    const { signup, loading, error: serverError } = useAuth();
    const navigate = useNavigate();

    const { name, email, phone, address, password, confirmPassword } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setClientError('');

        if (password !== confirmPassword) {
            setClientError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setClientError('Password must be at least 6 characters');
            return;
        }

        await signup({ name, email, phone, address, password });
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Create Account</h2>
                <p className="auth-subtitle">Join us to explore the cosmos</p>

                {clientError && <div className="alert alert-danger">{clientError}</div>}
                {serverError && <div className="alert alert-danger">{serverError}</div>}

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            required
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={phone}
                            onChange={onChange}
                            required
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <textarea
                            name="address"
                            value={address}
                            onChange={onChange}
                            required
                            placeholder="Enter your full address"
                            rows="2"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onChange}
                            required
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="auth-redirect">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
