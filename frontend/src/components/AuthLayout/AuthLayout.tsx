import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './AuthLayout.css';

const images = [
    {
        url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop',
        title: 'Manage Events with Ease',
        subtitle: 'Create, promote, and sell tickets for your events in minutes.'
    },
    {
        url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
        title: 'Secure Payments',
        subtitle: 'Accept payments from anywhere in the world with bank-level security.'
    },
    {
        url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop',
        title: 'Real-time Analytics',
        subtitle: 'Track your sales and attendee data in real-time.'
    }
];

const AuthLayout: React.FC = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="auth-layout">
            {/* Left Side - Image Slider */}
            <div className="auth-slider">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`slider-item ${index === currentImage ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${img.url})` }}
                    >
                        <div className="slider-overlay">
                            <div className="slider-content">
                                <h2>{img.title}</h2>
                                <p>{img.subtitle}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="slider-dots">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`slider-dot ${index === currentImage ? 'active' : ''}`}
                            onClick={() => setCurrentImage(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Right Side - Form Content */}
            <div className="auth-content">
                <div className="auth-header">
                    <Link to="/" className="back-link">
                        <FaArrowLeft /> Back to Home
                    </Link>
                </div>
                <div className="auth-form-container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
