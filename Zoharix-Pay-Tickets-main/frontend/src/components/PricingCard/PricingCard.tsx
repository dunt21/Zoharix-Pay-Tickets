import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Button from '../Button/Button';
import './PricingCard.css';

interface PricingFeature {
    text: string;
    included: boolean;
}

interface PricingCardProps {
    plan: string;
    price: number;
    period?: string;
    description: string;
    features: PricingFeature[];
    featured?: boolean;
    badge?: string;
    ctaText: string;
    onCtaClick?: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
    plan,
    price,
    period = 'month',
    description,
    features,
    featured = false,
    badge,
    ctaText,
    onCtaClick,
}) => {
    return (
        <div className={`pricing-card ${featured ? 'featured' : ''}`}>
            {badge && <div className="pricing-badge">{badge}</div>}
            <div className="pricing-header">
                <h3 className="pricing-plan">{plan}</h3>
                <div className="pricing-price">
                    <span className="price-currency">$</span>
                    <span className="price-amount">{price}</span>
                    <span className="price-period">/{period}</span>
                </div>
                <p className="pricing-description">{description}</p>
            </div>
            <ul className="pricing-features">
                {features.map((feature, index) => (
                    <li key={index} className={feature.included ? 'feature-included' : 'feature-excluded'}>
                        {feature.included ? (
                            <FaCheck className="feature-icon included" />
                        ) : (
                            <FaTimes className="feature-icon excluded" />
                        )}
                        <span>{feature.text}</span>
                    </li>
                ))}
            </ul>
            <Button
                variant={featured ? 'primary' : 'outline'}
                onClick={onCtaClick}
                className="pricing-cta"
            >
                {ctaText}
            </Button>
        </div>
    );
};

export default PricingCard;
