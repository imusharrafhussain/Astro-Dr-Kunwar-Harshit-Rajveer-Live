const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getAvailability,
    createBooking,
    getAllBookings,
    updateStatus,
} = require('../controllers/pujaBookingController');

// Public routes
router.get('/availability', getAvailability);
router.post('/', createBooking);

// Admin-only routes (protected)
router.get('/', protect, getAllBookings);
router.patch('/:id/status', protect, updateStatus);

module.exports = router;
