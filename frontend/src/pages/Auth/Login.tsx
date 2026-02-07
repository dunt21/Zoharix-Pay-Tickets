import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
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
    const { success, error } = useToast();

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
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Save token and user info
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                success('Login successful! Redirecting...');
                console.log('Login successful');

                setTimeout(() => {
                    setIsLoading(false);
                    navigate('/dashboard');
                }, 500);
            } else {
                error(data.message || 'Login failed');
                setIsLoading(false);
            }
        } catch (err) {
            console.error('Login error:', err);
            error('Connection error. Please try again.');
            setIsLoading(false);
        }
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
                        cursor: 'pointer'
                    }}
                >
                <FcGoogle style={{ fontSize: '20px' }} />
                    Sign in with Google
                </a>
            </form>



            <p className="auth-footer-text">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;
