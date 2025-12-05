import React, { useState } from 'react';
import { FaBell, FaEnvelope, FaMobileAlt } from 'react-icons/fa';
import Switch from '../../../components/Switch/Switch';
import Button from '../../../components/Button/Button';
import { useToast } from '../../../context/ToastContext';

const NotificationPreferences: React.FC = () => {
    const { success, info } = useToast();
    const defaultPreferences = {
        emailMarketing: true,
        emailSecurity: true,
        emailUpdates: false,
        smsReminders: true,
        smsPromos: false,
        pushNewEvents: true,
        pushMessages: true,
    };

    const [preferences, setPreferences] = useState(defaultPreferences);

    const toggle = (key: keyof typeof preferences) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        success('Notification preferences saved');
    };

    const handleReset = () => {
        setPreferences(defaultPreferences);
        info('Preferences reset to default');
    };

    return (
        <div className="settings-section-card">
            <div className="card-header">
                <div>
                    <h3 className="card-title"><FaBell /> Notification Preferences</h3>
                    <p className="card-description">Choose how and when you want to be notified.</p>
                </div>
            </div>

            {/* Email Notifications */}
            <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaEnvelope size={16} /> Email Notifications
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Marketing & Offers</p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Receive updates about new features and promotions.</p>
                        </div>
                        <Switch checked={preferences.emailMarketing} onChange={() => toggle('emailMarketing')} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Security Alerts</p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Get notified about important security activity.</p>
                        </div>
                        <Switch checked={preferences.emailSecurity} onChange={() => toggle('emailSecurity')} />
                    </div>
                </div>
            </div>

            {/* SMS Notifications */}
            <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaMobileAlt size={16} /> SMS Notifications
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Event Reminders</p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Get reminders 1 hour before events start.</p>
                        </div>
                        <Switch checked={preferences.smsReminders} onChange={() => toggle('smsReminders')} />
                    </div>
                </div>
            </div>

            <div className="form-actions">
                <Button variant="outline" onClick={handleReset}>Reset to Defaults</Button>
                <Button variant="primary" onClick={handleSave}>Save Preferences</Button>
            </div>
        </div>
    );
};

export default NotificationPreferences;
