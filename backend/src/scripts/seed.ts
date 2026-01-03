import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Event from '../models/Event';
import Booking from '../models/Booking';
import connectDB from '../config/database';

dotenv.config();

const seedData = async () => {
    try {
        // 1. Connect to DB
        await connectDB();
        console.log('🌱 Connected to Database for Seeding...');

        // 2. Clear existing data (Optional: Remove if you want to keep data)
        await User.deleteMany({});
        await Event.deleteMany({});
        await Booking.deleteMany({});
        console.log('🧹 Cleared existing Users, Events, and Bookings.');

        // 3. Create Users
        const passwordHash = await bcrypt.hash('password123', 10);

        const adminUser = await User.create({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@zevents.com',
            password: passwordHash,
            role: 'admin',
            isVerified: true,
            balance: 1000
        });

        const demoUser = await User.create({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: passwordHash,
            role: 'user',
            isVerified: true,
            balance: 500
        });

        const demoOrganizer = await User.create({
            firstName: 'Sarah',
            lastName: 'Organizer',
            email: 'sarah@events.com',
            password: passwordHash,
            role: 'organizer',
            isVerified: true,
            balance: 0
        });

        console.log('👥 Created Users: Admin, John Doe, and Sarah Organizer');

        // 4. Create Events
        const events = await Event.insertMany([
            {
                title: 'Neon Nights Festival',
                description: 'The biggest neon party in the city with top DJs from around the world. Experience a night of lights, music, and dance.',
                date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                location: 'Grand Arena, Accra',
                organizer: adminUser._id,
                category: 'Party',
                imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
                status: 'published',
                ticketTypes: [
                    { name: 'Regular', price: 150, quantity: 500, sold: 0 },
                    { name: 'VIP', price: 300, quantity: 100, sold: 0 }
                ],
                tags: ['music', 'nightlife', 'party']
            },
            {
                title: 'Tech Future Summit 2026',
                description: 'A gathering of the value creators and tech enthusiasts. Discussing AI, Blockchain, and the future of work.',
                date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
                location: 'Kempinski Hotel',
                organizer: demoOrganizer._id,
                category: 'Tech',
                imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
                status: 'published',
                ticketTypes: [
                    { name: 'General Admission', price: 300, quantity: 200, sold: 0 },
                    { name: 'Student', price: 100, quantity: 50, sold: 0 }
                ],
                tags: ['tech', 'conference', 'networking']
            },
            {
                title: 'Afrochella Vibes',
                description: 'Experience the culture through music, art, and fashion. A celebration of African creativity.',
                date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
                location: 'El Wak Stadium',
                organizer: adminUser._id,
                category: 'Cultural',
                imageUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80',
                status: 'published',
                ticketTypes: [
                    { name: 'Standard', price: 200, quantity: 1000, sold: 0 }
                ],
                tags: ['culture', 'music', 'festival']
            },
            {
                title: 'Startup Pitch Night',
                description: 'Watch 10 startups pitch to top VCs. Networking and drinks afterwards.',
                date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                location: 'Impact Hub, Osu',
                organizer: demoOrganizer._id,
                category: 'Business',
                imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80',
                status: 'published',
                ticketTypes: [
                    { name: 'Entry', price: 50, quantity: 100, sold: 0 }
                ],
                tags: ['business', 'startup', 'pitch']
            }
        ]);

        console.log(`📅 Created ${events.length} Demo Events`);

        // 5. Create a Booking
        const eventToBook = events[0];
        await Booking.create({
            user: demoUser._id,
            event: eventToBook._id,
            type: 'event',
            tickets: [{ type: 'Regular', quantity: 2, price: 150 }],
            totalAmount: 300,
            status: 'confirmed',
            bookingReference: `BK${Date.now()}TEST`,
            createdAt: new Date()
        });

        console.log('🎟️ Created 1 Demo Booking for John Doe');

        console.log('-----------------------------------');
        console.log('✅ Seeding Completed Successfully!');
        console.log('-----------------------------------');
        console.log('Login Credentials:');
        console.log('Admin: admin@zevents.com / password123');
        console.log('User: john@example.com / password123');
        console.log('Organizer: sarah@events.com / password123');
        console.log('-----------------------------------');

        process.exit(0);

    } catch (error) {
        console.error('❌ Seeding Failed:', error);
        process.exit(1);
    }
};

seedData();
