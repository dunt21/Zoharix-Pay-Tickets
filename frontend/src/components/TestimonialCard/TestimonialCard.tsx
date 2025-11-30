import React from 'react';
import { FaStar } from 'react-icons/fa';
import './TestimonialCard.css';

interface TestimonialCardProps {
    rating: number;
    text: string;
    authorName: string;
    authorTitle: string;
    authorInitials: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
    rating,
    text,
    authorName,
    authorTitle,
    authorInitials,
}) => {
    return (
        <div className="testimonial-card">
            <div className="testimonial-rating">
                {[...Array(rating)].map((_, index) => (
                    <FaStar key={index} className="star-icon" />
                ))}
            </div>
            <p className="testimonial-text">"{text}"</p>
            <div className="testimonial-author">
                <div className="author-avatar">{authorInitials}</div>
                <div className="author-info">
                    <div className="author-name">{authorName}</div>
                    <div className="author-title">{authorTitle}</div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
