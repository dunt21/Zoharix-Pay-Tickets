import React from 'react';
import './AppAlert.css';
import Button from '../Button/Button';

interface AppAlertProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    variant?: 'danger' | 'warning' | 'info';
    children?: React.ReactNode;
    maxWidth?: string;
}

const AppAlert: React.FC<AppAlertProps> = ({
    isOpen,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    variant = 'warning',
    children,
    maxWidth
}) => {
    if (!isOpen) return null;

    return (
        <div className="app-alert-overlay" onClick={onCancel}>
            <div
                className="app-alert-content"
                onClick={(e) => e.stopPropagation()}
                style={maxWidth ? { maxWidth } : {}}
            >
                <div className={`app-alert-header ${variant}`}>
                    <h3>{title}</h3>
                </div>
                <div className="app-alert-body">
                    {message && <p>{message}</p>}
                    {children}
                </div>
                <div className="app-alert-footer">
                    {cancelText && (
                        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
                            {cancelText}
                        </Button>
                    )}
                    <Button type="button" variant="primary" size="sm" onClick={onConfirm}>
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AppAlert;
