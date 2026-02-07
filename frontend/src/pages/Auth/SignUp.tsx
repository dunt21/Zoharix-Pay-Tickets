import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useToast } from '../../context/ToastContext';
import { apiClient, API_ENDPOINTS } from '../../config/api';
import './Auth.css';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { error, success } = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        if (!formData.firstName.trim()) {
            error('First name is required');
            return false;
        }
        if (!formData.lastName.trim()) {
            error('Last name is required');
            return false;
        }
        if (!formData.email.trim()) {
            error('Email is required');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            error('Please enter a valid email address');
            return false;
        }
        if (formData.password.length < 8) {
            error('Password must be at least 8 characters long');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            error('Passwords do not match');
            return false;
        }
        if (!formData.acceptTerms) {
            error('Please accept the terms and conditions');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            console.log('Attempting signup to:', API_ENDPOINTS.SIGNUP);
            console.log('Signup data:', { email: formData.email, firstName: formData.firstName, lastName: formData.lastName });

            const response = await apiClient.post(API_ENDPOINTS.SIGNUP, {
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName
            });

            success('Account created successfully! Redirecting to login...');
            console.log('Signup response:', response.data);

            // Redirect to login page after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err: any) {
            console.error('Signup error:', err);

            // Handle different error scenarios
            let errorMessage = 'Signup failed. Please try again.';

            if (err.response) {
                // Server responded with error
                if (err.response.status === 400) {
                    errorMessage = err.response.data?.message || 'User already exists or invalid data.';
                } else if (err.response.status === 500) {
                    errorMessage = 'Server error. Please try again later.';
                } else {
                    errorMessage = err.response.data?.message || 'Signup failed. Please try again.';
                }
            } else if (err.request) {
                // Request made but no response
                errorMessage = 'Cannot connect to server. Please check your internet connection.';
            } else {
                // Something else happened
                errorMessage = err.message || 'An unexpected error occurred.';
            }

            error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div className="auth-form-wrapper">
            <div className="auth-title-section">
                <h1>Create Account</h1>
                <p>Join us and start creating amazing events</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="name-fields">
                    <Input
                        type="text"
                        name="firstName"
                        label="First Name"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        icon={<FaUser />}
                        required
                        fullWidth
                    />

                    <Input
                        type="text"
                        name="lastName"
                        label="Last Name"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        icon={<FaUser />}
                        required
                        fullWidth
                    />
                </div>

                <Input
                    type="email"
                    name="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    icon={<FaEnvelope />}
                    required
                    fullWidth
                />

                <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    label="Password"
                    placeholder="Create a password (min. 8 characters)"
                    value={formData.password}
                    onChange={handleInputChange}
                    rightIcon={
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="password-toggle"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    }
                    required
                    fullWidth
                />

                <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    rightIcon={
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="password-toggle"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    }
                    required
                    fullWidth
                />

                <div className="terms-acceptance">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="acceptTerms"
                            checked={formData.acceptTerms}
                            onChange={handleInputChange}
                        />
                        <span className="checkmark"></span>
                        I agree to the <Link to="/terms" target="_blank" rel="noopener noreferrer">terms and conditions</Link>
                    </label>
                </div>

                <Button
                    type="submit"
                    className="btn-primary full-width"
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
            </form>

            <div className="auth-separator" style={{ margin: '1.5rem 0', textAlign: 'center', position: 'relative' }}>
                <span style={{ background: 'white', padding: '0 10px', color: '#666', position: 'relative', zIndex: 1 }}>OR</span>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#eee' }}></div>
            </div>

            <a 
                href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/auth/google`}
                className="btn-google full-width"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    background: 'white',
                    color: '#333',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    marginBottom: '1.5rem'
                }}
            >
                <FcGoogle style={{ fontSize: '20px' }} />
                Sign up with Google
            </a>

            <p className="auth-footer-text">
                Already have an account? <Link to="/login">Log In</Link>
            </p>
        </div>
    );
};

export default SignUp;
