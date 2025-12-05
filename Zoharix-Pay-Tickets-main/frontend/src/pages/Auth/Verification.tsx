import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Verification: React.FC = () => {
    return (
        <div className="auth-form-wrapper">
            <div className="auth-title-section">
                <h1>Create Account</h1>
                <p>This is the sign up</p>
            </div>

            <p className="auth-footer-text">
                Already have an account? <Link to="/login">Log In</Link>
            </p>
        </div>
    );
};

export default Verification;
