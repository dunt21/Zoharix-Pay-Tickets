import React from 'react';
import './Button.css';

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    icon?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    children,
    onClick,
    className = '',
    icon,
    type = 'button',
}) => {
    return (
        <button
            type={type}
            className={`btn btn-${variant} ${className}`}
            onClick={onClick}
        >
            {icon && <span className="btn-icon">{icon}</span>}
            <span className="btn-text">{children}</span>
        </button>
    );
};

export default Button;
