import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
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
    const { success } = useToast();

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

        // Simulate API delay
        setTimeout(() => {
            // Mock successful login
            const mockUser = {
                id: '1',
                email: formData.email,
                name: 'Demo User',
                role: 'user'
            };

            const mockToken = 'mock-jwt-token-12345';

            // Save token to localStorage
            localStorage.setItem('token', mockToken);
            localStorage.setItem('user', JSON.stringify(mockUser));

            success('Login successful! Redirecting...');
            console.log('Login successful (Mocked)');

            setIsLoading(false);
            navigate('/dashboard');
        }, 1500);
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



            <p className="auth-footer-text">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;
