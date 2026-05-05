const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');
const { escapeHtml } = require('../utils/sanitize');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContactForm = async (req, res, next) => {
    try {
        const contact = await Contact.create(req.body);

        const safeName = escapeHtml(req.body.name);
        const safeSubject = escapeHtml(req.body.subject);

        sendEmail({
            to: req.body.email,
            subject: 'We received your message — Astro Dr Kunwar Harshit Rajveer',
            html: `
        <h2>Hello ${safeName},</h2>
        <p>Thank you for reaching out to us!</p>
        <p>We have received your message about <strong>"${safeSubject}"</strong> and will respond within 24-48 hours.</p>
        <p>— Astro Dr Kunwar Harshit Rajveer Team</p>
      `,
        }).catch(console.error);

        // Notify Admin
        sendEmail({
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission: ${safeSubject}`,
            html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(req.body.message || 'No message provided')}</p>
      `,
        }).catch(console.error);

        res.status(201).json({
            success: true,
            message: 'Message sent successfully! We will get back to you soon.',
            data: { id: contact._id },
        });
    } catch (err) {
        next(err);
    }
};
