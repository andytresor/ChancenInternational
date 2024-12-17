import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Using Gmail as the email service
      auth: {
        user: 'tresorkengne45@gmail.com', // Your email address from the environment variables
        pass: 'bhkd qfzi cuwh rluu', // Your email password or app password
      },
    });
  }

  async sendEmail(mailOptions: { to: string; subject: string; text: string }): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"Chancen_International" <tresorkengne45@gmail.com>`, // Sender's email address
        to: mailOptions.to, // Recipient's email address
        subject: mailOptions.subject, // Email subject
        text: mailOptions.text, // Email content
      });
      console.log(`Email sent to ${mailOptions.to}`);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Email sending failed.');
    }
  }
}
