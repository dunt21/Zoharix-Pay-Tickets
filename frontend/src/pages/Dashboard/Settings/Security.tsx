import React, { useState } from 'react';
import { FaShieldAlt, FaKey, FaMobileAlt, FaDesktop, FaHistory } from 'react-icons/fa';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import Switch from '../../../components/Switch/Switch';
import { useToast } from '../../../context/ToastContext';
import './Security.css';

const Security: React.FC = () => {
    const { success, info } = useToast();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            info('Passwords do not match');
            return;
        }
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            success('Password updated successfully');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }, 1500);
    };

    const handle2FAToggle = (checked: boolean) => {
        setTwoFactorEnabled(checked);
        if (checked) {
            success('Two-Factor Authentication enabled');
        } else {
            info('Two-Factor Authentication disabled');
        }
    };

    return (
        <div className="security-container">
            <header className="dashboard-header" style={{ marginBottom: '2.5rem' }}>
                <div>
                    <h1 className="dashboard-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <FaShieldAlt style={{ fontSize: '28px', color: 'var(--accent-color, #8b5cf6)' }} />
                        Security & Privacy
                    </h1>
                    <p className="dashboard-subtitle">Manage your account security and active sessions.</p>
                </div>
            </header>

            {/* Password Section */}
            <section className="security-section">
                <div className="section-header">
                    <h3 className="section-title">
                        <FaKey /> Password
                    </h3>
                    <p className="section-description">
                        Update your password to keep your account secure. We recommend using a strong password that you don't use elsewhere.
                    </p>
                </div>

                <form onSubmit={handlePasswordUpdate} className="password-form">
                    <Input
                        type="password"
                        label="Current Password"
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        fullWidth
                    />
                    <Input
                        type="password"
                        label="New Password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        fullWidth
                    />
                    <Input
                        type="password"
                        label="Confirm New Password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                    />
                    <div className="form-actions">
                        <Button type="submit" variant="primary" disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Update Password'}
                        </Button>
                    </div>
                </form>
            </section>

            {/* Two-Factor Authentication Section */}
            <section className="security-section">
                <div className="section-header">
                    <h3 className="section-title">
                        <FaShieldAlt /> Two-Factor Authentication
                        <span className={`status-badge ${twoFactorEnabled ? 'enabled' : 'disabled'}`}>
                            {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                    </h3>
                </div>

                <div className="two-factor-content">
                    <div className="two-factor-info">
                        <p className="section-description">
                            Add an extra layer of security to your account by enabling two-factor authentication (2FA).
                            We'll ask for a code from your authentication app when you log in.
                        </p>
                    </div>
                    <Switch
                        checked={twoFactorEnabled}
                        onChange={handle2FAToggle}
                        label={twoFactorEnabled ? "On" : "Off"}
                    />
                </div>
            </section>

            {/* Login History Section */}
            <section className="security-section">
                <div className="section-header">
                    <h3 className="section-title">
                        <FaHistory /> Login History
                    </h3>
                    <p className="section-description">
                        Recent login activity for your account. If you see any suspicious activity, change your password immediately.
                    </p>
                </div>

                <div className="login-history-list">
                    {/* Mock Data Item 1 */}
                    <div className="login-item">
                        <div className="device-info">
                            <div className="device-icon">
                                <FaDesktop />
                            </div>
                            <div className="device-details">
                                <h4>Windows PC - Chrome</h4>
                                <p>Lagos, Nigeria • 192.168.1.1</p>
                            </div>
                        </div>
                        <div className="login-time">
                            <span className="login-date">Just now</span>
                            <span className="login-status">Active now</span>
                        </div>
                    </div>

                    {/* Mock Data Item 2 */}
                    <div className="login-item">
                        <div className="device-info">
                            <div className="device-icon">
                                <FaMobileAlt />
                            </div>
                            <div className="device-details">
                                <h4>iPhone 13 - Safari</h4>
                                <p>Lagos, Nigeria • 10.0.0.5</p>
                            </div>
                        </div>
                        <div className="login-time">
                            <span className="login-date">Yesterday, 10:23 PM</span>
                            <span className="login-status">Successful</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Security;
