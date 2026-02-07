import React from 'react';
import { FaStar } from 'react-icons/fa';
import './TestimonialCard.css';

interface TestimonialCardProps {
    name: string;
    role: string;
    company: string;
    image: string;
    content: string;
    rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
    name,
    role,
    company,
    image,
    content,
    rating,
}) => {
    return (
        <div className="testimonial-card">
            <div className="testimonial-rating">
                {[...Array(rating)].map((_, index) => (
                    <FaStar key={index} className="star-icon" />
                ))}
            </div>
            <p className="testimonial-text">"{content}"</p>
            <div className="testimonial-author">
                <img src={image} alt={name} className="author-avatar" />
                <div className="author-info">
                    <div className="author-name">{name}</div>
                    <div className="author-title">{role} at {company}</div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
