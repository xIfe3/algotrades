import nodemailer from "nodemailer";
import {
    generateDepositRequestEmail,
    generateWithdrawalRequestEmail,
    generateAdminDepositNotification,
    generateAdminWithdrawalNotification,
    generateDepositStatusEmail,
    generateWithdrawalStatusEmail,
    generateLoginEmail,
    generateRegistrationEmail,
    generatePasswordChangeNotification,
    generatePasswordResetEmail,
    generateAdminProfileUpdateNotification,
} from "./emailTemplates";

// Address admin notifications are sent to.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "Admin <admin@algotrades.io>";
// Sender address. Must belong to the SMTP account (MAIL_USER).
const MAIL_FROM =
    process.env.MAIL_FROM ||
    `Admin <${process.env.MAIL_USER || "admin@algotrades.io"}>`;

class EmailService {
    transporter: nodemailer.Transporter;

    constructor() {
        // Set up nodemailer transporter with Postmark SMTP settings
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST || "smtp.hostinger.com",
            port: Number(process.env.MAIL_PORT || 465),
            secure: true,
            auth: {
                user: process.env.MAIL_USER || "admin@algotrades.io",
                pass: process.env.MAIL_PASS || "",
            },
        });
    }

    /** Logs in to the SMTP server without sending anything. */
    async verifyConnection() {
        if (!process.env.MAIL_PASS) {
            console.warn(
                "[mail] MAIL_PASS is not set - NO emails will be sent. Add MAIL_USER and MAIL_PASS to your environment."
            );
            return false;
        }
        try {
            await this.transporter.verify();
            console.log(
                `[mail] SMTP login OK as ${process.env.MAIL_USER || "admin@algotrades.io"} - emails will be sent`
            );
            return true;
        } catch (error: any) {
            console.error(
                `[mail] SMTP login FAILED (${error?.code || "error"}: ${error?.message}). Emails will not be sent until MAIL_USER/MAIL_PASS are correct.`
            );
            return false;
        }
    }

    async sendMail(to: string, subject: string, html: string) {
        if (!process.env.MAIL_PASS) {
            console.warn(
                `[mail] Not sending "${subject}" to ${to}: MAIL_PASS is not set`
            );
            return;
        }
        try {
            console.log(`Sending email to: ${to} with subject: ${subject}`);
            const response = await this.transporter.sendMail({
                from: MAIL_FROM,
                to: to,
                subject: subject,
                html: html,
                text: html.replace(/<[^>]*>/g, ""), // Optional: generate plain text from HTML
                headers: {
                    "X-PM-Message-Stream": "outbound", // Specify message stream
                },
            });
            console.log("Email sent successfully:", response);
        } catch (error) {
            console.error(
                `[mail] Failed to send "${subject}" to ${to}: ${
                    (error as any)?.code || ""
                } ${(error as any)?.message || error}`
            );
        }
    }

    // User login notification
    async sendLoginNotification(user: any) {
        const template = generateLoginEmail(user.fullName);
        await this.sendMail(user.email, "New Login Notification", template);
    }
    // User profile update notification
    async sendProfileUpdatedNotification(user: any) {
        const template = generateAdminProfileUpdateNotification(user.fullName);
        await this.sendMail(
            user.email,
            "Profile Updated Notification",
            template
        );
    }

    // User registration confirmation
    async sendRegistrationConfirmation(user: any, token: number) {
        const template = generateRegistrationEmail(user.fullName, token);
        await this.sendMail(
            user.email,
            "Welcome to Algotrades - Please Verify Your Email",
            template
        );
    }

    // User deposit status update
    async sendDepositStatusUpdate(user: any, amount: number, status: string) {
        const template = generateDepositStatusEmail(
            user.fullName,
            amount,
            status
        );
        await this.sendMail(user.email, "Deposit Status Update", template);
    }

    // User deposit request
    async sendDepositRequest(user: any, amount: number) {
        const template = generateDepositRequestEmail(user.fullName, amount);
        await this.sendMail(user.email, "Deposit Request Received", template);
    }

    // Notify admin about deposit request
    async notifyAdminAboutDeposit(user: any, amount: number) {
        const template = generateAdminDepositNotification(
            user.fullName,
            amount
        );
        await this.sendMail(ADMIN_EMAIL, "New Deposit Request", template);
    }

    async notifyAdminAboutProfileUpdate(user: any) {
        const template = generateAdminProfileUpdateNotification(user.fullName);
        await this.sendMail(ADMIN_EMAIL, "User Profile Updated", template);
    }

    // Withdrawal status update
    async sendWithdrawalStatusUpdate(
        user: any,
        amount: number,
        status: string
    ) {
        const template = generateWithdrawalStatusEmail(
            user.fullName,
            amount,
            status
        );
        await this.sendMail(user.email, "Withdrawal Status Update", template);
    }

    // Withdrawal request
    async sendWithdrawalRequest(user: any, amount: number) {
        const template = generateWithdrawalRequestEmail(user.fullName, amount);
        await this.sendMail(
            user.email,
            "Withdrawal Request Received",
            template
        );
    }

    // Notify admin about withdrawal request
    async notifyAdminAboutWithdrawal(user: any, amount: number) {
        const template = generateAdminWithdrawalNotification(
            user.fullName,
            amount
        );
        await this.sendMail(ADMIN_EMAIL, "New Withdrawal Request", template);
    }

    // Password change notification
    async sendPasswordChangeNotification(user: any) {
        const template = generatePasswordChangeNotification(user.fullName);
        await this.sendMail(
            user.email,
            "Password Change Notification",
            template
        );
    }

    // Password reset request
    async sendPasswordResetRequest(user: any, resetLink: string) {
        const template = generatePasswordResetEmail(user.fullName, resetLink);
        await this.sendMail(user.email, "Password Reset Request", template);
    }
}

export default EmailService;
