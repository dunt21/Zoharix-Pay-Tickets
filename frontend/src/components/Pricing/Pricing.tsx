import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';
import PricingCard from '../PricingCard/PricingCard';
import { FaLightbulb } from 'react-icons/fa';
import './Pricing.css';

const Pricing: React.FC = () => {
    const plans = [
        {
            plan: 'Free',
            price: 0,
            description: 'Perfect for getting started',
            features: [
                { text: 'Up to 50 tickets/month', included: true },
                { text: 'Basic event pages', included: true },
                { text: 'QR tickets', included: true },
                { text: 'Email support', included: true },
                { text: 'Custom branding', included: false },
                { text: 'Analytics', included: false },
            ],
            ctaText: 'Start Free',
        },
        {
            plan: 'Pro',
            price: 9,
            description: 'For serious organizers',
            features: [
                { text: 'Unlimited tickets', included: true },
                { text: 'Custom pages', included: true },
                { text: 'QR tickets', included: true },
                { text: 'Priority support', included: true },
                { text: 'Custom branding', included: true },
                { text: 'Advanced analytics', included: true },
                { text: 'API access', included: true },
            ],
            featured: true,
            badge: 'Popular',
            ctaText: 'Go Pro',
        },
        {
            plan: 'Enterprise',
            price: 29,
            description: 'For large scale events',
            features: [
                { text: 'Unlimited everything', included: true },
                { text: 'White-label solution', included: true },
                { text: 'Dedicated account manager', included: true },
                { text: '24/7 Phone support', included: true },
                { text: 'Custom integrations', included: true },
                { text: 'Multi-user access', included: true },
                { text: 'SLA guarantee', included: true },
            ],
            ctaText: 'Contact Sales',
        },
    ];

    return (
        <section id="pricing" className="pricing">
            <SectionHeader
                title="Simple Pricing"
                subtitle="Start free, upgrade anytime"
            />

            <div className="pricing-grid">
                {plans.map((plan, index) => (
                    <PricingCard key={index} {...plan} />
                ))}
            </div>

            <div className="pricing-note">
                <FaLightbulb className="note-icon" />
                <p>2% transaction fee. No hidden charges. Cancel anytime.</p>
            </div>
        </section>
    );
};

export default Pricing;
