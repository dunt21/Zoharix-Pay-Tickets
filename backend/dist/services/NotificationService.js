"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
        try {
            const Notification = (await Promise.resolve().then(() => __importStar(require('../models/Notification')))).default;
            const notification = new Notification({
                user: data.userId,
                type: data.type || 'system',
                title: data.title,
                message: data.message,
                data: data.data
            });
            await notification.save();
            console.log('In-app notification saved:', notification._id);
        }
        catch (error) {
            console.error('Failed to save in-app notification:', error);
            throw new Error('Failed to send in-app notification');
        }
    }
    async sendPushNotification(data) {
        console.log('Push notification would be sent:', {
            userId: data.userId,
            title: data.title,
            message: data.message,
            data: data.data
        });
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
        try {
            const promises = userIds.map(userId => this.sendNotification({ ...data, userId }));
            await Promise.all(promises);
            console.log(`Bulk notification sent to ${userIds.length} users`);
        }
        catch (error) {
            console.error('Failed to send bulk notification:', error);
            throw new Error('Failed to send bulk notification');
        }
    }
    async sendEventReminder(eventId, userIds) {
        try {
            const Event = (await Promise.resolve().then(() => __importStar(require('../models/Event')))).default;
            const event = await Event.findById(eventId);
            if (!event) {
                throw new Error('Event not found');
            }
            const reminderData = {
                title: `Reminder: ${event.title}`,
                message: `Don't forget! ${event.title} is happening on ${event.date.toDateString()} at ${event.location}.`,
                type: 'event_reminder',
                data: { eventId, eventTitle: event.title, eventDate: event.date }
            };
            await this.sendBulkNotification(userIds, reminderData);
            console.log(`Event reminders sent for ${event.title} to ${userIds.length} users`);
        }
        catch (error) {
            console.error('Failed to send event reminders:', error);
            throw new Error('Failed to send event reminders');
        }
    }
    async sendMarketingEmail(email, campaignId, content) {
        try {
            const User = (await Promise.resolve().then(() => __importStar(require('../models/User')))).default;
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
        }
        catch (error) {
            console.error('Failed to send marketing email:', error);
            throw new Error('Failed to send marketing email');
        }
    }
}
exports.default = NotificationService;
//# sourceMappingURL=NotificationService.js.map