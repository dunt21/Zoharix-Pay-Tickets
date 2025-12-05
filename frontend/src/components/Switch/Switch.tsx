import React from 'react';
import './Switch.css';

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    className?: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, label, className = '' }) => {
    return (
        <label className={`switch-container ${className}`}>
            <input
                type="checkbox"
                className="switch-input"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <div className="switch-track">
                <div className="switch-thumb" />
            </div>
            {label && <span className="switch-label">{label}</span>}
        </label>
    );
};

export default Switch;
