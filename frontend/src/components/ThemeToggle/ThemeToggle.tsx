import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className={`theme-toggle-btn ${theme}`}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <div className="toggle-track">
                <div className="toggle-thumb">
                    {theme === 'dark' ? <FaMoon className="toggle-icon" /> : <FaSun className="toggle-icon" />}
                </div>
            </div>
        </button>
    );
};

export default ThemeToggle;
