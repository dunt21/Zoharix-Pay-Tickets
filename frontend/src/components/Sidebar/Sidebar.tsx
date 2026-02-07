import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    FaThLarge,
    FaCalendarAlt,
    FaTicketAlt,
    FaWallet,
    FaChartPie,
    FaCog,
    FaSignOutAlt,
    FaTimes,
    FaMoon,
    FaSun
} from 'react-icons/fa';
import './Sidebar.css';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        // Clear auth data
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Navigate to landing page
        navigate('/');
    };

    const menuItems = [
        { path: '/dashboard', icon: <FaThLarge />, label: 'Dashboard' },
        { path: '/dashboard/services', icon: <FaCalendarAlt />, label: 'Events & Services' },
        { path: '/dashboard/bookings', icon: <FaTicketAlt />, label: 'Tickets & Bookings' },
        { path: '/dashboard/wallet', icon: <FaWallet />, label: 'Wallet' },
        { path: '/dashboard/analytics', icon: <FaChartPie />, label: 'Analytics' },
        { path: '/dashboard/settings', icon: <FaCog />, label: 'Settings' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <img src="/apple-touch-icon.png" alt="Z-Events Logo" className="logo-img" />
                        <span className="logo-text">Z-Events</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="sidebar-content">
                    <div className="user-profile-summary">
                        <div className="user-avatar">
                            <span>ZT</span>
                        </div>
                        <div className="user-info">
                            <span className="user-name">Zoharix Tech</span>
                            <span className="user-role">Organizer</span>
                        </div>
                    </div>

                    <nav className="sidebar-nav">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `nav-item ${isActive ? 'active' : ''}`
                                }
                                end={item.path === '/dashboard'}
                                onClick={() => {
                                    if (window.innerWidth < 1024) {
                                        onClose();
                                    }
                                }}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-label">{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="sidebar-footer">
                    <button className="theme-toggle-btn icon-only" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}>
                        {theme === 'dark' ? <FaSun /> : <FaMoon />}
                    </button>
                    <button className="logout-btn" onClick={handleLogout}>
                        <FaSignOutAlt />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
