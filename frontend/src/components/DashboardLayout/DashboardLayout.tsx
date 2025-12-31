import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
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
                    <div className="sidebar-logo" style={{ padding: 0 }}>
                        <img src="/apple-touch-icon.png" alt="Z-Events Logo" className="logo-img" style={{ width: '32px', height: '32px' }} />
                        <span className="logo-text" style={{ fontSize: '1.2rem' }}>Z-Events</span>
                    </div>
                    <button className="menu-toggle" onClick={toggleSidebar}>
                        <LayoutDashboard size={24} />
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
