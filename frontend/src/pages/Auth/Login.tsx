import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useToast } from '../../context/ToastContext';
import { apiClient, API_ENDPOINTS } from '../../config/api';
import './Auth.css';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { error, success } = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await apiClient.post(API_ENDPOINTS.LOGIN, {
                email: formData.email,
                password: formData.password
            });

            // Save token to localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            success('Login successful! Redirecting...');
            console.log('Login response:', response.data);
            navigate('/dashboard');
        } catch (err: any) {
            console.error('Login error:', err);

            // Handle different error scenarios
            let errorMessage = 'Login failed. Please try again.';

            if (err.response) {
                // Server responded with error
                if (err.response.status === 401) {
                    errorMessage = err.response.data?.message || 'Invalid email or password. Please check your credentials.';
                } else if (err.response.status === 500) {
                    errorMessage = 'Server error. Please try again later.';
                } else {
                    errorMessage = err.response.data?.message || 'Login failed. Please try again.';
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

    const handleSocialLogin = (provider: string) => {
        // TODO: Implement social login
        console.log(`Login with ${provider}`);
    };

    return (
        <div className="auth-form-wrapper">
            <div className="auth-title-section">
                <h1>Welcome Back</h1>
                <p>Sign in to your account to continue</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
                <Input
                    type="email"
                    name="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    fullWidth
                />

                <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
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

                <div className="auth-form-options">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleInputChange}
                        />
                        <span className="checkmark"></span>
                        Remember me
                    </label>

                    <Link to="/forgot-password" className="forgot-password-link">
                        Forgot password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    className="btn-primary full-width"
                    disabled={isLoading}
                >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
            </form>

            <div className="auth-divider">
                <span>or continue with</span>
            </div>

            <div className="social-login">
                <Button
                    type="button"
                    variant="outline"
                    className="btn-social full-width"
                    onClick={() => handleSocialLogin('google')}
                    icon={<FaGoogle />}
                >
                    Google
                </Button>


            </div>

            <p className="auth-footer-text">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;
