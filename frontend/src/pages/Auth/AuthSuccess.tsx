import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

const AuthSuccess: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { success, error } = useToast();

    const processed = React.useRef(false);

    useEffect(() => {
        if (processed.current) return;
        
        const token = searchParams.get('token');

        if (token) {
            processed.current = true;
            // Save token
            localStorage.setItem('token', token);
            
            // Optional: Decode token to get user info or fetch profile immediately
            // For now, just assume success
            
            success('Successfully logged in with Google!');
            navigate('/dashboard', { replace: true });
        } else {
            // Ideally we should check if we really failed or if search params are just empty
            // But if we're on this page, we expect a token
            const errorParam = searchParams.get('error');
            if (errorParam) {
                 processed.current = true;
                 error('Google login failed. Please try again.');
                 navigate('/login', { replace: true });
            }
        }
    }, [searchParams, navigate, success, error]);

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            flexDirection: 'column',
            gap: '1rem'
        }}>
            <h2>Authenticating...</h2>
            <div className="spinner"></div> {/* Assuming you have spinner styles or component */}
        </div>
    );
};

export default AuthSuccess;
