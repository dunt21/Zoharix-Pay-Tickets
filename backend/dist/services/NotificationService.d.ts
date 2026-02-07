import EmailService from './EmailService';
interface NotificationData {
    userId: string;
    type: 'email' | 'in_app' | 'push' | 'event_reminder' | 'marketing' | 'system';
    title: string;
    message: string;
    data?: Record<string, any>;
}
declare class NotificationService {
    private emailService;
    constructor(emailService: EmailService);
    sendNotification(data: NotificationData): Promise<void>;
    private sendEmailNotification;
    private sendInAppNotification;
    private sendPushNotification;
    private getEmailTemplate;
    sendBulkNotification(userIds: string[], data: Omit<NotificationData, 'userId'>): Promise<void>;
    sendEventReminder(eventId: string, userIds: string[]): Promise<void>;
    sendMarketingEmail(email: string, campaignId: string, content: string): Promise<void>;
}
export default NotificationService;
//# sourceMappingURL=NotificationService.d.ts.map