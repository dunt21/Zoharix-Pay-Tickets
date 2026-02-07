import EmailService from './EmailService';

interface NotificationData {
  userId: string;
  type: 'email' | 'in_app' | 'push' | 'event_reminder' | 'marketing' | 'system';
  title: string;
  message: string;
  data?: Record<string, any>;
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
    try {
      const Notification = (await import('../models/Notification')).default;
      const notification = new Notification({
        user: data.userId,
        type: data.type || 'system',
        title: data.title,
        message: data.message,
        data: data.data
      });
      await notification.save();
      console.log('In-app notification saved:', notification._id);
    } catch (error) {
      console.error('Failed to save in-app notification:', error);
      throw new Error('Failed to send in-app notification');
    }
  }

  private async sendPushNotification(data: NotificationData): Promise<void> {
    // Basic implementation - in production, integrate with Firebase, OneSignal, etc.
    // For now, just log and could be extended with actual push service
    console.log('Push notification would be sent:', {
      userId: data.userId,
      title: data.title,
      message: data.message,
      data: data.data
    });

    // TODO: Integrate with push notification service
    // Example: await firebase.messaging().send(message);
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
    try {
      // For now, send individually. In production, use job queue for better performance
      const promises = userIds.map(userId =>
        this.sendNotification({ ...data, userId })
      );
      await Promise.all(promises);
      console.log(`Bulk notification sent to ${userIds.length} users`);
    } catch (error) {
      console.error('Failed to send bulk notification:', error);
      throw new Error('Failed to send bulk notification');
    }
  }

  async sendEventReminder(eventId: string, userIds: string[]): Promise<void> {
    try {
      const Event = (await import('../models/Event')).default;
      const event = await Event.findById(eventId);

      if (!event) {
        throw new Error('Event not found');
      }

      const reminderData = {
        title: `Reminder: ${event.title}`,
        message: `Don't forget! ${event.title} is happening on ${event.date.toDateString()} at ${event.location}.`,
        type: 'event_reminder' as const,
        data: { eventId, eventTitle: event.title, eventDate: event.date }
      };

      await this.sendBulkNotification(userIds, reminderData);
      console.log(`Event reminders sent for ${event.title} to ${userIds.length} users`);
    } catch (error) {
      console.error('Failed to send event reminders:', error);
      throw new Error('Failed to send event reminders');
    }
  }

  async sendMarketingEmail(email: string, campaignId: string, content: string): Promise<void> {
    try {
      // TODO: Integrate with EmailService once implemented
      // For now, just log and save as notification
      const User = (await import('../models/User')).default;
      const user = await User.findOne({ email });

      if (user) {
        await this.sendInAppNotification({
          userId: user._id.toString(),
          type: 'marketing',
          title: 'Marketing Update',
          message: content,
          data: { campaignId }
        });
      }

      console.log(`Marketing email would be sent to ${email} for campaign ${campaignId}`);
      // TODO: await emailService.sendEmail(email, 'Marketing Update', content);
    } catch (error) {
      console.error('Failed to send marketing email:', error);
      throw new Error('Failed to send marketing email');
    }
  }
}

export default NotificationService;