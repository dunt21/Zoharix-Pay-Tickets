import React, { useState, useRef } from 'react';
import { FaCheckCircle, FaUpload, FaIdCard, FaFileAlt } from 'react-icons/fa';
import Button from '../../../components/Button/Button';
import { useToast } from '../../../context/ToastContext';

const OrganizerVerification: React.FC = () => {
    const { success } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            success(`Selected file: ${e.target.files[0].name}`);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="settings-section-card">
            <div className="card-header">
                <div>
                    <h3 className="card-title"><FaCheckCircle /> Organizer Verification</h3>
                    <p className="card-description">Verify your identity to host paid events and withdraw funds.</p>
                </div>
                <div style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '50px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#10B981',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <FaCheckCircle /> Verified
                </div>
            </div>

            <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                marginBottom: '2rem'
            }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaIdCard /> Identity Document
                </h4>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    Your government-issued ID has been verified. You don't need to take any further action.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{
                        flex: 1,
                        padding: '1rem',
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: '8px',
                        border: '1px dashed rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        gap: '0.5rem'
                    }}>
                        <FaCheckCircle color="#10B981" /> passport_front.jpg
                    </div>
                </div>
            </div>

            <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Additional Documents</h4>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    Upload any additional documents requested by our compliance team.
                </p>

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                    accept=".pdf,.jpg,.jpeg,.png"
                />

                <div
                    onClick={handleUploadClick}
                    style={{
                        border: '2px dashed rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '2rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        background: selectedFile ? 'rgba(139, 92, 246, 0.05)' : 'transparent',
                        borderColor: selectedFile ? '#8B5CF6' : 'rgba(255, 255, 255, 0.1)'
                    }}
                >
                    {selectedFile ? (
                        <>
                            <FaFileAlt size={32} style={{ color: '#8B5CF6' }} />
                            <div>
                                <p style={{ color: 'var(--text-primary)', fontWeight: '500', marginBottom: '0.25rem' }}>{selectedFile.name}</p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <Button variant="ghost" onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}>Remove</Button>
                        </>
                    ) : (
                        <>
                            <FaUpload size={24} style={{ color: 'var(--text-secondary)' }} />
                            <div>
                                <p style={{ color: 'var(--text-primary)', fontWeight: '500', marginBottom: '0.5rem' }}>Click to upload or drag and drop</p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>PDF, JPG or PNG (max. 10MB)</p>
                            </div>
                            <Button variant="outline" onClick={(e) => { e.stopPropagation(); handleUploadClick(); }}>Select File</Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrganizerVerification;
