import React from 'react';
import { FaCheck } from 'react-icons/fa';
import './FeatureCard.css';

interface FeatureCardProps {
    icon?: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    featured?: boolean;
    badge?: string;
    image?: string;
    className?: string; // Added className prop
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    icon,
    title,
    description,
    features,
    featured = false,
    badge,
    image,
    className = '',
}) => {
    return (
        <div className={`feature-card ${featured ? 'featured' : ''} ${className}`}>
            {badge && <div className="feature-badge">{badge}</div>}

            <div className="feature-image-wrapper">
                {image && <img src={image} alt={title} className="feature-bg-image" />}
                <div className="feature-overlay"></div>
            </div>

            <div className="feature-content">
                <div className="feature-header">
                    {icon && <div className="feature-icon">{icon}</div>}
                    <h3 className="feature-title">{title}</h3>
                </div>

                <p className="feature-description">{description}</p>

                <ul className="feature-list">
                    {features.map((feature, index) => (
                        <li key={index}>
                            <FaCheck className="check-icon" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FeatureCard;
