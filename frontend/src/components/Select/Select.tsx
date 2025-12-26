import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './Select.css';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    icon?: React.ReactNode;
    className?: string;
}

const Select: React.FC<SelectProps> = ({
    label,
    value,
    onChange,
    options,
    placeholder = 'Select an option',
    icon,
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className={`custom-select-group ${className}`} ref={selectRef}>
            {label && <label className="select-label">{label}</label>}

            <div className="custom-select-container">
                <div
                    className={`custom-select-trigger ${isOpen ? 'is-open' : ''} ${icon ? 'has-icon' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {icon && <div className="trigger-icon">{icon}</div>}

                    <div className={`trigger-text ${!selectedOption ? 'is-placeholder' : ''}`}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </div>

                    <div className={`trigger-arrow ${isOpen ? 'is-rotated' : ''}`}>
                        <ChevronDown size={14} />
                    </div>
                </div>

                {isOpen && (
                    <div className="custom-select-menu">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className={`custom-select-option ${option.value === value ? 'is-selected' : ''}`}
                                onClick={() => handleSelect(option.value)}
                            >
                                {option.label}
                                {option.value === value && <div className="selected-dot"></div>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Select;
