interface EventSearchFilters {
    category?: string;
    location?: string;
    dateFrom?: Date;
    dateTo?: Date;
    priceMin?: number;
    priceMax?: number;
    organizer?: string;
}
interface EventStats {
    totalEvents: number;
    totalBookings: number;
    totalRevenue: number;
    averageTicketsPerEvent: number;
}
declare class EventService {
    getEventsWithFilters(filters: EventSearchFilters, page?: number, limit?: number): Promise<any>;
    getEventAnalytics(eventId: string): Promise<any>;
    checkEventAvailability(eventId: string, ticketType: string, quantity: number): Promise<boolean>;
    getOrganizerStats(organizerId: string): Promise<EventStats>;
    getUpcomingEvents(limit?: number): Promise<any[]>;
    updateEventStatus(eventId: string, status: 'draft' | 'published' | 'cancelled' | 'completed'): Promise<void>;
    getEventsByLocation(location: string, radius?: number): Promise<any[]>;
    getTrendingEvents(limit?: number): Promise<any[]>;
}
export default EventService;
//# sourceMappingURL=EventService.d.ts.map