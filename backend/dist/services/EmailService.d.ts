interface EmailConfig {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };
}
declare class EmailService {
    constructor(config: EmailConfig);
    sendEmail(to: string, subject: string, html: string, text?: string): Promise<void>;
    sendVerificationEmail(email: string, token: string): Promise<void>;
    sendPasswordResetEmail(email: string, token: string): Promise<void>;
    sendEventNotification(email: string, eventTitle: string, eventDate: string, action: 'created' | 'updated' | 'cancelled'): Promise<void>;
    sendBookingConfirmation(email: string, eventTitle: string, bookingReference: string, tickets: any[]): Promise<void>;
    private stripHtml;
    verifyConnection(): Promise<void>;
}
export default EmailService;
//# sourceMappingURL=EmailService.d.ts.map