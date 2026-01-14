import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { apiClient, API_ENDPOINTS } from '../../config/api';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    // TEMPORARY: Bypassing authentication for development
    const isAuthenticated = true;

    /* 
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const location = useLocation();

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');

            if (!token || !user) {
                setIsAuthenticated(false);
                return;
            }

            try {
                // Verify token by fetching profile
                await apiClient.get(API_ENDPOINTS.PROFILE);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Auth verification failed:', error);
                setIsAuthenticated(false);
            }
        };

        verifyToken();
    }, []);

    // Loading state
    if (isAuthenticated === null) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '1.2rem',
                color: '#666'
            }}>
                Loading...
            </div>
        );
    }

    // Not authenticated - redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    */

    // Authenticated - render children
    return <>{children}</>;
};

export default ProtectedRoute;
