import { IEvent } from '../models/Event';
interface PaginatedEvents {
    events: IEvent[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}
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
    getEventsWithFilters(filters: EventSearchFilters, page?: number, limit?: number): Promise<PaginatedEvents>;
    getEventAnalytics(eventId: string): Promise<any>;
    checkEventAvailability(eventId: string, ticketType: string, quantity: number): Promise<boolean>;
    getOrganizerStats(organizerId: string): Promise<EventStats>;
    getUpcomingEvents(limit?: number): Promise<any[]>;
    updateEventStatus(eventId: string, status: 'draft' | 'published' | 'cancelled' | 'completed'): Promise<void>;
    getEventsByLocation(location: string, radius?: number): Promise<any[]>;
    getTrendingEvents(limit?: number): Promise<any[]>;
    createEvent(data: any): Promise<IEvent>;
    updateEvent(eventId: string, organizerId: string, updates: any): Promise<IEvent | null>;
    deleteEvent(eventId: string, organizerId: string): Promise<IEvent | null>;
}
declare const _default: EventService;
export default _default;
//# sourceMappingURL=EventService.d.ts.map