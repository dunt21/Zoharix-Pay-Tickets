import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';
import TestimonialCard from '../TestimonialCard/TestimonialCard';
import './Testimonials.css';

const Testimonials: React.FC = () => {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Jenkins",
            role: "Event Organizer",
            company: "TechSummit",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            content: "Zoharix has completely transformed how we handle ticketing. The analytics are a game-changer!",
            rating: 5
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Venue Manager",
            company: "The Grand Hall",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            content: "Seamless payments and instant payouts. It's exactly what we needed for our high-volume events.",
            rating: 5
        },
        {
            id: 3,
            name: "Jessica Ford",
            role: "Festival Director",
            company: "Summer Vibes",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            content: "The best platform for managing large-scale festivals. Customer support is also top-notch.",
            rating: 5
        },
        {
            id: 4,
            name: "David Ross",
            role: "Concert Promoter",
            company: "Live Nation",
            image: "https://randomuser.me/api/portraits/men/85.jpg",
            content: "Incredible ease of use. Setting up an event takes minutes, and the ticket scanning is flawless.",
            rating: 5
        },
        {
            id: 5,
            name: "Emily White",
            role: "Marketing Head",
            company: "Creative Arts",
            image: "https://randomuser.me/api/portraits/women/22.jpg",
            content: "Our sales increased by 30% thanks to the built-in marketing tools. Highly recommended!",
            rating: 4
        }
    ];

    // Duplicate for infinite scroll
    const allTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="testimonials">
            <SectionHeader
                title="Loved by Organizers"
                subtitle="See what event professionals are saying about Zoharix."
            />

            <div className="testimonials-marquee-container">
                <div className="testimonials-marquee-track">
                    {allTestimonials.map((testimonial, index) => (
                        <div key={`${testimonial.id}-${index}`} className="testimonial-slide">
                            <TestimonialCard
                                name={testimonial.name}
                                role={testimonial.role}
                                company={testimonial.company}
                                image={testimonial.image}
                                content={testimonial.content}
                                rating={testimonial.rating}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
