import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLock, FaCheckCircle } from 'react-icons/fa';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useToast } from '../../context/ToastContext';
import './Auth.css';

const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { success, error } = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (formData.password.length < 8) {
            error('Password must be at least 8 characters long');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            error('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            success('Password reset successful!');
        }, 1500);
    };

    return (
        <div className="auth-form-wrapper">
            {isSuccess ? (
                <div className="auth-success-state animate-fade-in">
                    <div className="success-icon-wrapper">
                        <FaCheckCircle className="success-checkmark" />
                    </div>
                    <div className="auth-title-section">
                        <h1>Password Reset</h1>
                        <p>Your password has been successfully updated. You can now use your new credentials to log in.</p>
                    </div>
                    <Button
                        className="btn-primary full-width"
                        onClick={() => navigate('/login')}
                    >
                        Go to Log In
                    </Button>
                </div>
            ) : (
                <>
                    <div className="auth-title-section">
                        <h1>Reset Password</h1>
                        <p>Create a new secure password for your account</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            label="New Password"
                            placeholder="Enter new password (min. 8 characters)"
                            value={formData.password}
                            onChange={handleInputChange}
                            icon={<FaLock />}
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
                            label="Confirm New Password"
                            placeholder="Confirm your new password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            icon={<FaLock />}
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

                        <Button
                            type="submit"
                            className="btn-primary full-width"
                            disabled={isLoading}
                            style={{ marginTop: '1rem' }}
                        >
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </Button>
                    </form>

                    <div className="auth-footer-text">
                        <p>Remember your password? <Link to="/login">Log In</Link></p>
                    </div>
                </>
            )}
        </div>
    );
};

export default ResetPassword;
