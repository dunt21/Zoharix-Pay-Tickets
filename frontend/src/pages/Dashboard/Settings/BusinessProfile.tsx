import React, { useState } from 'react';
import { FaBuilding, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { useToast } from '../../../context/ToastContext';

const BusinessProfile: React.FC = () => {
    const { success } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        businessName: 'Z-Events Inc.',
        taxId: 'US-123456789',
        website: 'https://z-events.com',
        address: '123 Event St, San Francisco, CA',
        description: 'Leading event management platform.',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            success('Business profile updated successfully');
        }, 1500);
    };

    return (
        <div className="settings-section-card">
            <div className="card-header">
                <div>
                    <h3 className="card-title"><FaBuilding /> Business Information</h3>
                    <p className="card-description">Manage your business details for invoices and public profile.</p>
                </div>
            </div>

            <form className="form-grid" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <Input
                    label="Business Name"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    fullWidth
                />
                <Input
                    label="Tax ID / VAT Number"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                    fullWidth
                />
                <Input
                    label="Website"
                    name="website"
                    icon={<FaGlobe />}
                    value={formData.website}
                    onChange={handleChange}
                    fullWidth
                />
                <Input
                    label="Business Address"
                    name="address"
                    icon={<FaMapMarkerAlt />}
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                />
                <div style={{ gridColumn: '1 / -1' }}>
                    <Input
                        label="Business Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                    />
                </div>

                <div className="form-actions" style={{ gridColumn: '1 / -1' }}>
                    <Button variant="outline" type="button">Cancel</Button>
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Business Info'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BusinessProfile;
