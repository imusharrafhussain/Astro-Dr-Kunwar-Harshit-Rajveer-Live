const Appointment = require('../models/Appointment');
const sendEmail = require('../utils/sendEmail');
const { escapeHtml } = require('../utils/sanitize');

// @desc    Book a consultation
// @route   POST /api/appointments
// @access  Public
exports.createAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.create(req.body);

        // Prepare safe values for email content
        const safeName = escapeHtml(req.body.name);
        const safeService = escapeHtml(req.body.service);
        const safePreferredTime = escapeHtml(req.body.preferredTime);
        const preferredDate = req.body.preferredDate ? new Date(req.body.preferredDate) : null;
        const safePreferredDate = preferredDate && !isNaN(preferredDate)
            ? preferredDate.toLocaleDateString()
            : '';

        // Send confirmation email (non-blocking)
        sendEmail({
            to: req.body.email,
            subject: 'Consultation Booking Confirmation — Astro Dr Kunwar Harshit Rajveer',
            html: `
        <h2>Thank you, ${safeName}!</h2>
        <p>Your consultation booking has been received.</p>
        <p><strong>Service:</strong> ${safeService}</p>
        ${safePreferredDate ? `<p><strong>Date:</strong> ${safePreferredDate}</p>` : ''}
        <p><strong>Time:</strong> ${safePreferredTime}</p>
        <p>We will confirm your appointment within 24 hours.</p>
        <p>— Astro Dr Kunwar Harshit Rajveer Team</p>
      `,
        }).catch(console.error);

        res.status(201).json({
            success: true,
            message: 'Appointment booked successfully! We will contact you shortly.',
            data: appointment,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get booked slots
// @route   GET /api/appointments/booked
// @access  Public
exports.getBookedSlots = async (req, res, next) => {
    try {
        // Fetch appointments that are not cancelled
        const appointments = await Appointment.find({ status: { $ne: 'cancelled' } })
            .select('preferredDate preferredTime status')
            .lean();
        
        const booked = appointments.map(app => {
            const dateObj = new Date(app.preferredDate);
            return {
                date: !isNaN(dateObj) ? dateObj.toISOString().split('T')[0] : null,
                time: app.preferredTime,
            };
        }).filter(b => b.date);
        
        res.json({ success: true, data: booked });
    } catch (err) {
        next(err);
    }
};
