import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';
import Button from '../../components/Button/Button';
import './Auth.css';

const Verification: React.FC = () => {
    return (
        <div className="auth-form-wrapper verification-wrapper">
            <div className="verification-icon-container">
                <div className="icon-circle">
                    <FaEnvelope className="verification-icon" />
                </div>
            </div>

            <div className="auth-title-section">
                <h1>Check Your Email</h1>
                <p>We've sent a verification link to your email address.</p>
            </div>

            <div className="verification-content">
                <p className="verification-text">
                    Please check your inbox and click the link to verify your account.
                    If you don't see it, check your spam folder.
                </p>

                <div className="verification-actions">
                    <Button
                        variant="primary"
                        className="full-width"
                        onClick={() => window.open('mailto:', '_blank')}
                    >
                        Open Email App
                    </Button>

                    <Button
                        variant="outline"
                        className="full-width"
                        onClick={() => alert('Verification email resent!')}
                    >
                        Resend Email
                    </Button>
                </div>
            </div>

            <p className="auth-footer-text">
                Back to <Link to="/login">Log In</Link>
            </p>
        </div>
    );
};

export default Verification;
