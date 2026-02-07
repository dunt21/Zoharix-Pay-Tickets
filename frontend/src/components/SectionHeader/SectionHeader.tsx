import React from 'react';
import './SectionHeader.css';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    badge?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    centered = true,
    badge,
}) => {
    return (
        <div className={`section-header ${centered ? 'centered' : ''}`}>
            {badge && <div className="section-badge">{badge}</div>}
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
    );
};

export default SectionHeader;
