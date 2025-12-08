// import nodemailer from 'nodemailer'; // TODO: Install nodemailer

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

class EmailService {
  // private transporter: nodemailer.Transporter;

  constructor(config: EmailConfig) {
    // TODO: Initialize nodemailer transporter
    console.log('EmailService initialized with config:', config);
  }

  async sendEmail(to: string, subject: string, html: string, text?: string): Promise<void> {
    // TODO: Implement email sending with nodemailer
    console.log(`Sending email to ${to} with subject: ${subject}`);
    // Placeholder - remove when nodemailer is installed
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify/${token}`;
    const subject = 'Verify Your Z-Events Account';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Z-Events!</h2>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">Verify Email</a>
        <p>If the button doesn't work, copy and paste this URL into your browser:</p>
        <p>${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>Z-Events Team</p>
      </div>
    `;

    await this.sendEmail(email, subject, html);
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    const subject = 'Reset Your Z-Events Password';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>You requested a password reset for your Z-Events account.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">Reset Password</a>
        <p>If the button doesn't work, copy and paste this URL into your browser:</p>
        <p>${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this reset, please ignore this email.</p>
        <p>Best regards,<br>Z-Events Team</p>
      </div>
    `;

    await this.sendEmail(email, subject, html);
  }

  async sendEventNotification(email: string, eventTitle: string, eventDate: string, action: 'created' | 'updated' | 'cancelled'): Promise<void> {
    const subject = `Event ${action.charAt(0).toUpperCase() + action.slice(1)}: ${eventTitle}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Event Update</h2>
        <p>The event "${eventTitle}" has been ${action}.</p>
        <p>Event Date: ${new Date(eventDate).toLocaleDateString()}</p>
        <p>Please check your dashboard for more details.</p>
        <p>Best regards,<br>Z-Events Team</p>
      </div>
    `;

    await this.sendEmail(email, subject, html);
  }

  async sendBookingConfirmation(email: string, eventTitle: string, bookingReference: string, tickets: any[]): Promise<void> {
    const subject = 'Booking Confirmation - Z-Events';
    const ticketDetails = tickets.map(ticket =>
      `<li>${ticket.quantity}x ${ticket.type} - $${ticket.price * ticket.quantity}</li>`
    ).join('');

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Booking Confirmed!</h2>
        <p>Your booking for "${eventTitle}" has been confirmed.</p>
        <p><strong>Booking Reference:</strong> ${bookingReference}</p>
        <h3>Ticket Details:</h3>
        <ul>${ticketDetails}</ul>
        <p>Please keep this email for your records.</p>
        <p>Best regards,<br>Z-Events Team</p>
      </div>
    `;

    await this.sendEmail(email, subject, html);
  }

  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '');
  }

  async verifyConnection(): Promise<void> {
    // TODO: Implement connection verification with nodemailer
    console.log('Email service connection verification - placeholder');
  }
}

export default EmailService;