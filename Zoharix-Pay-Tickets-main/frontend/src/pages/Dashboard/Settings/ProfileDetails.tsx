import React, { useState } from 'react';
import { FaUser, FaCamera } from 'react-icons/fa';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { useToast } from '../../../context/ToastContext';

const ProfileDetails: React.FC = () => {
    const { success } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: 'Alex',
        lastName: 'Johnson',
        email: 'alex.johnson@example.com',
        phone: '+1 (555) 123-4567',
        bio: 'Event enthusiast and community organizer.',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            success('Profile updated successfully');
        }, 1500);
    };

    const handleImageUpload = () => {
        // Mock image upload
        success('Profile picture updated');
    };

    return (
        <div className="settings-section-card">
            <div className="card-header">
                <div>
                    <h3 className="card-title"><FaUser /> Personal Information</h3>
                    <p className="card-description">Update your personal details and public profile.</p>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'var(--gradient-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    color: 'white',
                    position: 'relative',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                }}>
                    {formData.firstName[0]}
                    <button
                        onClick={handleImageUpload}
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            background: 'var(--bg-secondary)',
                            border: '2px solid var(--bg-primary)',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'var(--text-primary)',
                            transition: 'all 0.2s ease'
                        }}
                        className="profile-camera-btn"
                    >
                        <FaCamera size={14} />
                    </button>
                </div>
                <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Profile Picture</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        PNG, JPG up to 5MB
                    </p>
                    <Button variant="outline" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }} onClick={handleImageUpload}>
                        Upload New
                    </Button>
                </div>
            </div>

            <form className="form-grid" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                />
                <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                />
                <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                />
                <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                />
                <div style={{ gridColumn: '1 / -1' }}>
                    <Input
                        label="Bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        fullWidth
                    />
                </div>

                <div className="form-actions" style={{ gridColumn: '1 / -1' }}>
                    <Button variant="outline" type="button">Cancel</Button>
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProfileDetails;
