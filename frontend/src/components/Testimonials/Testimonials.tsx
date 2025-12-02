import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';
import TestimonialCard from '../TestimonialCard/TestimonialCard';
import './Testimonials.css';

const Testimonials: React.FC = () => {
    const testimonials = [
        {
            id: 1,
            name: "Amara Okafor",
            role: "Event Organizer",
            company: "Lagos Tech Summit",
            image: "https://i.pravatar.cc/150?img=5",
            content: "EventZ has completely transformed how we handle ticketing for our tech conferences across West Africa. The analytics are a game-changer!",
            rating: 5
        },
        {
            id: 2,
            name: "Kwame Mensah",
            role: "Venue Manager",
            company: "Accra Convention Centre",
            image: "https://i.pravatar.cc/150?img=12",
            content: "Seamless payments and instant payouts in multiple African currencies. It's exactly what we needed for our high-volume events.",
            rating: 5
        },
        {
            id: 3,
            name: "Zainab Diallo",
            role: "Festival Director",
            company: "Afrobeat Festival",
            image: "https://i.pravatar.cc/150?img=9",
            content: "The best platform for managing large-scale music festivals across the continent. Customer support is also top-notch.",
            rating: 5
        },
        {
            id: 4,
            name: "Chidi Nwosu",
            role: "Concert Promoter",
            company: "Naija Live Events",
            image: "https://i.pravatar.cc/150?img=13",
            content: "Incredible ease of use. Setting up an event takes minutes, and the mobile ticket scanning works perfectly even with limited connectivity.",
            rating: 5
        },
        {
            id: 5,
            name: "Thandiwe Moyo",
            role: "Marketing Director",
            company: "Joburg Arts Collective",
            image: "https://i.pravatar.cc/150?img=10",
            content: "Our ticket sales increased by 40% thanks to the built-in marketing tools and social media integration. Highly recommended!",
            rating: 5
        }
    ];

    // Duplicate for infinite scroll
    const allTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="testimonials">
            <SectionHeader
                title="Loved by Organizers"
                subtitle="See what event professionals are saying about EventZ."
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
