const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { createAppointment, getBookedSlots } = require('../controllers/appointmentController');

const appointmentValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('address').optional().trim(),
    body('service').trim().notEmpty().withMessage('Please select a service'),
    body('subject').optional().trim(),
    body('preferredDate').isISO8601().withMessage('Valid date is required'),
    body('preferredTime').trim().notEmpty().withMessage('Preferred time is required'),
];

// GET /api/appointments/booked — Get booked slots
router.get('/booked', getBookedSlots);

// POST /api/appointments — Book a consultation
router.post('/', appointmentValidation, validate, createAppointment);

module.exports = router;
