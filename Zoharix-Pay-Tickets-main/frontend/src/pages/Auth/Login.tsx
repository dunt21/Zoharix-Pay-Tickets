import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Login: React.FC = () => {
    return (
        <div className="auth-form-wrapper">
            <div className="auth-title-section">
                <h1>Welcome Back</h1>
                <p>This is the login</p>
            </div>

            <p className="auth-footer-text">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;
