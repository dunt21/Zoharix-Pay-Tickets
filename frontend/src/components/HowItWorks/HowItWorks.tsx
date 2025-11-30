import React from 'react';
import { FaEdit, FaShareAlt, FaQrcode, FaEnvelope, FaComments, FaMobileAlt, FaCheckCircle } from 'react-icons/fa';
import SectionHeader from '../SectionHeader/SectionHeader';
import StepCard from '../StepCard/StepCard';
import Button from '../Button/Button';
import './HowItWorks.css';

const HowItWorks: React.FC = () => {
    const steps = [
        {
            number: '01',
            title: 'Create Your Event',
            description: 'Sign up and use our intuitive builder to create your event. Add details, set pricing, and customize your page.',
            visual: (
                <div className="visual-box">
                    <div className="visual-line"></div>
                    <div className="visual-line short"></div>
                    <div className="visual-line"></div>
                    <Button variant="primary" icon={<FaEdit />} className="visual-button">
                        Create Event
                    </Button>
                </div>
            ),
        },
        {
            number: '02',
            title: 'Share & Sell Tickets',
            description: 'Share your event link on social media. Customers buy tickets and pay instantly via their preferred method.',
            visual: (
                <div className="visual-box">
                    <div className="share-icons">
                        <FaMobileAlt />
                        <FaComments />
                        <FaEnvelope />
                    </div>
                    <Button variant="primary" icon={<FaShareAlt />} className="visual-button">
                        Share Event
                    </Button>
                </div>
            ),
        },
        {
            number: '03',
            title: 'Scan & Manage',
            description: 'Scan QR tickets at the door, track attendance, and manage everything from your dashboard.',
            visual: (
                <div className="visual-box">
                    <div className="qr-scanner">
                        <FaQrcode className="qr-icon" />
                        <div className="scanner-line"></div>
                    </div>
                    <Button variant="primary" icon={<FaCheckCircle />} className="visual-button success">
                        Verified
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <section id="how-it-works" className="how-it-works">
            <SectionHeader
                title="Get Started in 3 Simple Steps"
                subtitle="Launch your first event in under 5 minutes"
            />

            <div className="steps-container">
                {steps.map((step, index) => (
                    <React.Fragment key={index}>
                        <StepCard {...step} />
                        {index < steps.length - 1 && <div className="step-connector">→</div>}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
