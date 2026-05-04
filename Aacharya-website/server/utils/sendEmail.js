const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
    try {
        // Skip if email credentials are not configured
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log('📧 Email skipped (credentials not configured)');
            return false;
        }

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Astro Dr Kunwar Harshit Rajveer" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log(`📧 Email sent to ${to}`);
        return true;
    } catch (error) {
        console.error('📧 Email error:', error.message);
        return false;
    }
};

module.exports = sendEmail;
