const PujaBooking = require('../models/PujaBooking');

const MAX_PUJAS_PER_DAY = 5;
const LOCK_HOURS = 5;

// ── Helper: convert "HH:MM" to total minutes since midnight ──
function timeToMinutes(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
}

// ── Helper: add hours to "HH:MM" → new "HH:MM" ──
function addHours(timeStr, hours) {
    const totalMins = timeToMinutes(timeStr) + hours * 60;
    const h = Math.floor(totalMins / 60) % 24;
    const m = totalMins % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// ── Helper: do two time ranges overlap? ──
function rangesOverlap(startA, endA, startB, endB) {
    const a1 = timeToMinutes(startA);
    const a2 = timeToMinutes(endA);
    const b1 = timeToMinutes(startB);
    const b2 = timeToMinutes(endB);
    return a1 < b2 && b1 < a2;
}

// ─────────────────────────────────────────────
// GET /api/puja-bookings/availability
// Query: ?pujaId=surya-puja&date=2025-06-15
// Returns: available time slots and remaining quota
// ─────────────────────────────────────────────
exports.getAvailability = async (req, res, next) => {
    try {
        const { pujaId, date } = req.query;

        if (!pujaId || !date) {
            return res.status(400).json({ error: 'pujaId and date are required.' });
        }

        const bookings = await PujaBooking.find({
            pujaId,
            bookingDate: date,
            status: { $in: ['pending', 'confirmed'] },
        }).select('startTime endTime');

        const bookedSlots = bookings.map(b => ({ start: b.startTime, end: b.endTime }));
        const remaining = MAX_PUJAS_PER_DAY - bookings.length;

        res.json({
            date,
            pujaId,
            totalSlots: MAX_PUJAS_PER_DAY,
            bookedCount: bookings.length,
            remainingSlots: Math.max(remaining, 0),
            available: remaining > 0,
            bookedTimeWindows: bookedSlots, // so frontend can grey-out times
        });
    } catch (err) {
        next(err);
    }
};

// ─────────────────────────────────────────────
// POST /api/puja-bookings
// Body: { pujaId, pujaName, name, email, phone, gender, dateOfBirth, timeOfBirth,
//         gotra, fatherName, birthPlace, pinCode, pujaPurpose, fullAddress,
//         nearestLandmark, sankalpPlace,
//         bookingDate, startTime, package, amount, message }
// ─────────────────────────────────────────────
exports.createBooking = async (req, res, next) => {
    try {
        const {
            pujaId, pujaName,
            name, email, phone, gender, dateOfBirth, timeOfBirth, gotra,
            fatherName, birthPlace, pinCode, pujaPurpose, fullAddress, nearestLandmark, sankalpPlace,
            bookingDate, startTime,
            package: pkg, amount, message,
        } = req.body;

        // ── Validate required fields ──
        if (!pujaId || !pujaName || !name || !email || !phone || !bookingDate || !startTime || !amount) {
            return res.status(400).json({ error: 'Missing required booking fields.' });
        }

        // ── Calculate 5-hour lock window ──
        const endTime = addHours(startTime, LOCK_HOURS);

        // ── Check daily quota (max 5 pujas/day) ──
        const todayCount = await PujaBooking.countDocuments({
            pujaId,
            bookingDate,
            status: { $in: ['pending', 'confirmed'] },
        });

        if (todayCount >= MAX_PUJAS_PER_DAY) {
            return res.status(409).json({
                error: 'No puja slots available for today. Please choose another date.',
                code: 'DAILY_LIMIT_REACHED',
            });
        }

        // ── Check for time-slot conflict (5-hour overlap) ──
        const existingBookings = await PujaBooking.find({
            pujaId,
            bookingDate,
            status: { $in: ['pending', 'confirmed'] },
        }).select('startTime endTime');

        for (const booking of existingBookings) {
            if (rangesOverlap(startTime, endTime, booking.startTime, booking.endTime)) {
                return res.status(409).json({
                    error: `This time slot is locked until ${booking.endTime}. Please choose a different time.`,
                    code: 'TIME_SLOT_CONFLICT',
                    lockedUntil: booking.endTime,
                });
            }
        }

        // ── Create booking ──
        const newBooking = await PujaBooking.create({
            pujaId, pujaName,
            name, email, phone,
            gender: gender || 'male',
            dateOfBirth: dateOfBirth || '',
            timeOfBirth: timeOfBirth || '',
            gotra: gotra || '',
            fatherName: fatherName || '',
            birthPlace: birthPlace || '',
            pinCode: pinCode || '',
            pujaPurpose: pujaPurpose || '',
            fullAddress: fullAddress || '',
            nearestLandmark: nearestLandmark || '',
            sankalpPlace: sankalpPlace || '',
            bookingDate,
            startTime,
            endTime,
            package: pkg || 'basic',
            amount,
            message: message || '',
            status: 'pending',
        });

        res.status(201).json({
            message: 'Puja booked successfully! You will receive a confirmation.',
            booking: {
                id: newBooking._id,
                pujaName: newBooking.pujaName,
                bookingDate: newBooking.bookingDate,
                startTime: newBooking.startTime,
                endTime: newBooking.endTime,
                status: newBooking.status,
            },
        });
    } catch (err) {
        next(err);
    }
};

// ─────────────────────────────────────────────
// GET /api/puja-bookings (Admin)
// Returns all bookings, filterable by date / pujaId / status
// ─────────────────────────────────────────────
exports.getAllBookings = async (req, res, next) => {
    try {
        const { pujaId, date, status } = req.query;
        const filter = {};
        if (pujaId) filter.pujaId = pujaId;
        if (date) filter.bookingDate = date;
        if (status) filter.status = status;

        const bookings = await PujaBooking.find(filter).sort({ bookingDate: -1, startTime: 1 });
        res.json({ count: bookings.length, bookings });
    } catch (err) {
        next(err);
    }
};

// ─────────────────────────────────────────────
// PATCH /api/puja-bookings/:id/status (Admin)
// Body: { status: 'confirmed' | 'completed' | 'cancelled' }
// ─────────────────────────────────────────────
exports.updateStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const valid = ['pending', 'confirmed', 'completed', 'cancelled'];
        if (!valid.includes(status)) {
            return res.status(400).json({ error: 'Invalid status value.' });
        }

        const booking = await PujaBooking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!booking) return res.status(404).json({ error: 'Booking not found.' });
        res.json({ message: 'Status updated.', booking });
    } catch (err) {
        next(err);
    }
};
