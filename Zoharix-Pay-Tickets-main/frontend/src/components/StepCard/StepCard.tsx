import React from 'react';
import './StepCard.css';

interface StepCardProps {
    number: string;
    title: string;
    description: string;
    visual: React.ReactNode;
}

const StepCard: React.FC<StepCardProps> = ({
    number,
    title,
    description,
    visual,
}) => {
    return (
        <div className="step-card">
            <div className="step-number">{number}</div>
            <div className="step-content">
                <h3 className="step-title">{title}</h3>
                <p className="step-description">{description}</p>
                <div className="step-visual">{visual}</div>
            </div>
        </div>
    );
};

export default StepCard;
