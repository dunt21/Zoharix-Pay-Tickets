import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useToast } from '../../context/ToastContext';
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
            // TODO: Implement actual login logic
            console.log('Login attempt:', formData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            success('Login successful! Redirecting...');
            navigate('/dashboard');
        } catch (err) {
            error('Login failed. Please check your credentials.');
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
                    icon={
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="password-toggle"
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
