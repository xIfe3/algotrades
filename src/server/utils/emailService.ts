import EmailService from "./mailer";

// Shared mailer instance (was exported from the Express server's index.ts).
const globalForMail = globalThis as unknown as { __emailService?: EmailService };

export const emailService: EmailService =
    globalForMail.__emailService || (globalForMail.__emailService = new EmailService());
