const Appointment = require('../models/Appointment');
const sendEmail = require('../utils/sendEmail');
const { escapeHtml } = require('../utils/sanitize');

// @desc    Book a consultation
// @route   POST /api/appointments
// @access  Public
exports.createAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.create(req.body);

        const safeName = escapeHtml(req.body.name);
        
        // Notify Admin
        sendEmail({
            to: process.env.EMAIL_USER,
            subject: `New Consultation Appointment: ${safeName}`,
            html: `
        <h2>New Consultation Appointment</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone}</p>
        <p><strong>Consultation Type:</strong> ${req.body.consultationType || 'N/A'}</p>
        <p><strong>Preferred Date:</strong> ${req.body.preferredDate || 'N/A'}</p>
        <p><strong>Preferred Time:</strong> ${req.body.preferredTime || 'N/A'}</p>
        <p><strong>Date of Birth:</strong> ${req.body.dateOfBirth || 'N/A'}</p>
        <p><strong>Time of Birth:</strong> ${req.body.timeOfBirth || 'N/A'}</p>
        <p><strong>Place of Birth:</strong> ${req.body.placeOfBirth || 'N/A'}</p>
        <p><strong>Topics:</strong> ${req.body.topics ? req.body.topics.join(', ') : 'N/A'}</p>
        <p><strong>Additional Info:</strong></p>
        <p>${escapeHtml(req.body.additionalInfo || 'None')}</p>
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
            return {
                date: app.preferredDate,
                time: app.preferredTime,
            };
        });
        
        res.json({ success: true, data: booked });
    } catch (err) {
        next(err);
    }
};
