import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import './DashboardLayout.css';

const DashboardLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="dashboard-layout">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="dashboard-main">
                {/* Mobile Header */}
                <div className="dashboard-mobile-header">
                    <span className="mobile-title">Z-Events</span>
                    <button className="menu-toggle" onClick={toggleSidebar}>
                        <FaBars />
                    </button>
                </div>

                <div className="dashboard-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
