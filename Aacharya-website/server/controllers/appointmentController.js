const Appointment = require('../models/Appointment');
const sendEmail = require('../utils/sendEmail');
const { escapeHtml } = require('../utils/sanitize');

// @desc    Book a consultation
// @route   POST /api/appointments
// @access  Public
exports.createAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.create(req.body);

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
