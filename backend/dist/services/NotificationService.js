"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotificationService {
    constructor(emailService) {
        this.emailService = emailService;
    }
    async sendNotification(data) {
        try {
            switch (data.type) {
                case 'email':
                    await this.sendEmailNotification(data);
                    break;
                case 'in_app':
                    await this.sendInAppNotification(data);
                    break;
                case 'push':
                    await this.sendPushNotification(data);
                    break;
                default:
                    throw new Error(`Unsupported notification type: ${data.type}`);
            }
        }
        catch (error) {
            console.error('Notification sending failed:', error);
            throw new Error('Failed to send notification');
        }
    }
    async sendEmailNotification(data) {
        const { email, title, message, template } = data;
        let htmlContent = message;
        let subject = title;
        if (template) {
            const templateData = this.getEmailTemplate(template, data);
            htmlContent = templateData.html;
            subject = templateData.subject;
        }
        await this.emailService.sendEmail(email, subject, htmlContent);
    }
    async sendInAppNotification(data) {
        console.log('Sending in-app notification:', data);
    }
    async sendPushNotification(data) {
        console.log('Sending push notification:', data);
    }
    getEmailTemplate(template, data) {
        switch (template) {
            case 'verification':
                return {
                    subject: 'Verify Your Z-Events Account',
                    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Welcome to Z-Events!</h2>
              <p>Please verify your email address to complete your registration.</p>
              <p>${data.message}</p>
              <p>Best regards,<br>Z-Events Team</p>
            </div>
          `
                };
            case 'booking_confirmation':
                return {
                    subject: 'Booking Confirmation - Z-Events',
                    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Booking Confirmed!</h2>
              <p>${data.message}</p>
              <p>Best regards,<br>Z-Events Team</p>
            </div>
          `
                };
            case 'event_update':
                return {
                    subject: 'Event Update - Z-Events',
                    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Event Update</h2>
              <p>${data.message}</p>
              <p>Best regards,<br>Z-Events Team</p>
            </div>
          `
                };
            case 'payment_success':
                return {
                    subject: 'Payment Successful - Z-Events',
                    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Payment Successful</h2>
              <p>${data.message}</p>
              <p>Best regards,<br>Z-Events Team</p>
            </div>
          `
                };
            case 'refund_processed':
                return {
                    subject: 'Refund Processed - Z-Events',
                    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Refund Processed</h2>
              <p>${data.message}</p>
              <p>Best regards,<br>Z-Events Team</p>
            </div>
          `
                };
            default:
                return {
                    subject: data.title,
                    html: data.message
                };
        }
    }
    async sendBulkNotification(userIds, data) {
        console.log(`Sending bulk notification to ${userIds.length} users:`, data);
    }
    async sendEventReminder(eventId, userIds) {
        console.log(`Sending event reminders for event ${eventId} to ${userIds.length} users`);
    }
    async sendMarketingEmail(email, campaignId, content) {
        console.log(`Sending marketing email to ${email} for campaign ${campaignId}`);
    }
}
exports.default = NotificationService;
//# sourceMappingURL=NotificationService.js.map