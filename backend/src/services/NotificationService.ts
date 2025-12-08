import EmailService from './EmailService';

interface NotificationData {
  userId: string;
  type: 'email' | 'in_app' | 'push';
  title: string;
  message: string;
  metadata?: Record<string, any>;
}

interface EmailNotificationData extends NotificationData {
  email: string;
  template?: 'verification' | 'booking_confirmation' | 'event_update' | 'payment_success' | 'refund_processed';
}

class NotificationService {
  private emailService: EmailService;

  constructor(emailService: EmailService) {
    this.emailService = emailService;
  }

  async sendNotification(data: NotificationData): Promise<void> {
    try {
      switch (data.type) {
        case 'email':
          await this.sendEmailNotification(data as EmailNotificationData);
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
    } catch (error) {
      console.error('Notification sending failed:', error);
      throw new Error('Failed to send notification');
    }
  }

  private async sendEmailNotification(data: EmailNotificationData): Promise<void> {
    const { email, title, message, template } = data;

    let htmlContent = message;
    let subject = title;

    // Use predefined templates
    if (template) {
      const templateData = this.getEmailTemplate(template, data);
      htmlContent = templateData.html;
      subject = templateData.subject;
    }

    await this.emailService.sendEmail(email, subject, htmlContent);
  }

  private async sendInAppNotification(data: NotificationData): Promise<void> {
    // TODO: Implement in-app notification storage
    // This would typically save to a notifications collection in the database
    console.log('Sending in-app notification:', data);
  }

  private async sendPushNotification(data: NotificationData): Promise<void> {
    // TODO: Implement push notification service (e.g., Firebase, OneSignal)
    console.log('Sending push notification:', data);
  }

  private getEmailTemplate(template: string, data: NotificationData): { subject: string; html: string } {
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

  async sendBulkNotification(userIds: string[], data: Omit<NotificationData, 'userId'>): Promise<void> {
    // TODO: Implement bulk notification sending
    // This would typically use a job queue for performance
    console.log(`Sending bulk notification to ${userIds.length} users:`, data);
  }

  async sendEventReminder(eventId: string, userIds: string[]): Promise<void> {
    // TODO: Implement event reminder notifications
    console.log(`Sending event reminders for event ${eventId} to ${userIds.length} users`);
  }

  async sendMarketingEmail(email: string, campaignId: string, content: string): Promise<void> {
    // TODO: Implement marketing email functionality
    console.log(`Sending marketing email to ${email} for campaign ${campaignId}`);
  }
}

export default NotificationService;