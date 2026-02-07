import React, { useState } from 'react';
import {
    FaUser,
    FaBuilding,
    FaCheckCircle,
    FaCreditCard,
    FaBell,
    FaShieldAlt
} from 'react-icons/fa';
import ProfileDetails from './ProfileDetails';
import BusinessProfile from './BusinessProfile';
import OrganizerVerification from './OrganizerVerification';
import PaymentInfo from './PaymentInfo';
import NotificationPreferences from './NotificationPreferences';
import Security from './Security';
import './Settings.css';

type SettingsTab = 'profile' | 'business' | 'verification' | 'payment' | 'notifications' | 'security';

const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileDetails />;
            case 'business':
                return <BusinessProfile />;
            case 'verification':
                return <OrganizerVerification />;
            case 'payment':
                return <PaymentInfo />;
            case 'notifications':
                return <NotificationPreferences />;
            case 'security':
                return <Security />;
            default:
                return <ProfileDetails />;
        }
    };

    const tabs = [
        { id: 'profile', label: 'Profile Details', icon: <FaUser /> },
        { id: 'business', label: 'Business Profile', icon: <FaBuilding /> },
        { id: 'verification', label: 'Organizer Verification', icon: <FaCheckCircle /> },
        { id: 'payment', label: 'Payment Info', icon: <FaCreditCard /> },
        { id: 'notifications', label: 'Notification Preferences', icon: <FaBell /> },
        { id: 'security', label: 'Security', icon: <FaShieldAlt /> },
    ];

    return (
        <div className="settings-container">
            <aside className="settings-sidebar">
                <nav className="settings-nav">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id as SettingsTab)}
                        >
                            <span className="nav-icon">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </aside>

            <main className="settings-content">
                <header className="settings-header">
                    <h1 className="settings-title">Settings</h1>
                    <p className="settings-subtitle">Manage your account preferences and security settings.</p>
                </header>
                {renderContent()}
            </main>
        </div>
    );
};

export default Settings;
