const Report = require('../models/Report');
const sendEmail = require('../utils/sendEmail');
const { escapeHtml } = require('../utils/sanitize');

// @desc    Request a report
// @route   POST /api/reports
// @access  Public
exports.createReport = async (req, res, next) => {
    try {
        const report = await Report.create(req.body);

        const safeName = escapeHtml(req.body.name);
        const safeReportType = escapeHtml(req.body.reportType);

        sendEmail({
            to: req.body.email,
            subject: `${safeReportType} Report Request — Astro Dr Kunwar Harshit Rajveer`,
            html: `
        <h2>Hello ${safeName},</h2>
        <p>Your <strong>${safeReportType}</strong> report request has been received.</p>
        <p>Our experts will prepare your personalized report within 3-5 business days.</p>
        <p>You will receive it via email once ready.</p>
        <p>— Astro Dr Kunwar Harshit Rajveer Team</p>
      `,
        }).catch(console.error);

        // Notify Admin
        sendEmail({
            to: process.env.EMAIL_USER,
            subject: `New Report Request: ${safeReportType}`,
            html: `
        <h2>New Report Request</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Report Type:</strong> ${safeReportType}</p>
        <p><strong>Date of Birth:</strong> ${req.body.dateOfBirth || 'N/A'}</p>
        <p><strong>Time of Birth:</strong> ${req.body.timeOfBirth || 'N/A'}</p>
        <p><strong>Place of Birth:</strong> ${req.body.placeOfBirth || 'N/A'}</p>
        <p><strong>Gender:</strong> ${req.body.gender || 'N/A'}</p>
        <p><strong>Language:</strong> ${req.body.language || 'N/A'}</p>
        <p><strong>Specific Questions:</strong></p>
        <p>${escapeHtml(req.body.specificQuestions || 'None')}</p>
      `,
        }).catch(console.error);

        res.status(201).json({
            success: true,
            message: 'Report requested! You will receive it within 3-5 business days.',
            data: report,
        });
    } catch (err) {
        next(err);
    }
};
