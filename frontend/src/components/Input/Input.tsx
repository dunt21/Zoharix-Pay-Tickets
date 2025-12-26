import React, { type InputHTMLAttributes, type ReactNode } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label?: string;
    icon?: ReactNode;
    rightIcon?: ReactNode;
    error?: string;
    fullWidth?: boolean;
    multiline?: boolean;
    rows?: number;
}

const Input: React.FC<InputProps> = ({
    label,
    icon,
    rightIcon,
    error,
    fullWidth = false,
    className = '',
    multiline = false,
    rows = 3,
    ...props
}) => {
    return (
        <div className={`input-wrapper ${fullWidth ? 'full-width' : ''} ${className}`}>
            {label && <label className="input-label">{label}</label>}
            <div className={`input-container ${error ? 'input-error' : ''} ${multiline ? 'input-multiline' : ''}`}>
                {icon && <span className="input-icon">{icon}</span>}
                {multiline ? (
                    <textarea
                        className={`input-field ${icon ? 'with-icon' : ''} ${rightIcon ? 'with-right-icon' : ''}`}
                        rows={rows}
                        {...(props as any)}
                    />
                ) : (
                    <input
                        className={`input-field ${icon ? 'with-icon' : ''} ${rightIcon ? 'with-right-icon' : ''}`}
                        {...(props as any)}
                    />
                )}
                {rightIcon && <span className="input-right-icon">{rightIcon}</span>}
            </div>
            {error && <span className="input-error-message">{error}</span>}
        </div>
    );
};

export default Input;
