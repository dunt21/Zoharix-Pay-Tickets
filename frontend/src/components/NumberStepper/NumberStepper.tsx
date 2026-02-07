import React from 'react';
import { Plus, Minus } from 'lucide-react';
import './NumberStepper.css';

interface NumberStepperProps {
    value: number | string;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    label?: string;
    icon?: React.ReactNode;
}

const NumberStepper: React.FC<NumberStepperProps> = ({
    value,
    onChange,
    min = 0,
    max = 9999,
    label,
    icon
}) => {
    const numValue = typeof value === 'string' ? (parseInt(value) || 0) : value;

    const handleIncrement = () => {
        if (numValue < max) {
            onChange(numValue + 1);
        }
    };

    const handleDecrement = () => {
        if (numValue > min) {
            onChange(numValue - 1);
        }
    };

    return (
        <div className="stepper-wrapper">
            {label && <label className="stepper-label">{label}</label>}
            <div className="stepper-container">
                {icon && <span className="stepper-icon-inner">{icon}</span>}
                <button
                    type="button"
                    className="stepper-btn dec"
                    onClick={handleDecrement}
                    disabled={numValue <= min}
                >
                    <Minus size={16} />
                </button>
                <input
                    type="number"
                    className="stepper-input"
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value) || 0)}
                    min={min}
                    max={max}
                />
                <button
                    type="button"
                    className="stepper-btn inc"
                    onClick={handleIncrement}
                    disabled={numValue >= max}
                >
                    <Plus size={16} />
                </button>
            </div>
        </div>
    );
};

export default NumberStepper;
