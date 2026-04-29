const mongoose = require('mongoose');

const pujaBookingSchema = new mongoose.Schema({
    // Puja identification
    pujaId: { type: String, required: true, trim: true },   // e.g. "surya-puja"
    pujaName: { type: String, required: true, trim: true }, // e.g. "Surya (Sun) Puja"

    // User details
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'male' },
    dateOfBirth: { type: String, default: '', trim: true },
    timeOfBirth: { type: String, default: '', trim: true },
    gotra: { type: String, default: '', trim: true },       // Family lineage (optional)
    fatherName: { type: String, default: '', trim: true },
    birthPlace: { type: String, default: '', trim: true },
    pinCode: { type: String, default: '', trim: true },
    pujaPurpose: { type: String, default: '', trim: true },
    fullAddress: { type: String, default: '', trim: true },
    nearestLandmark: { type: String, default: '', trim: true },
    sankalpPlace: { type: String, default: '', trim: true },

    // Booking slot
    bookingDate: { type: String, required: true },          // "YYYY-MM-DD" stored as string for easy daily queries
    startTime: { type: String, required: true },            // "HH:MM" (24-hr)
    endTime: { type: String, required: true },              // startTime + 5 hours (lock window)

    // Pricing & package
    package: {
        type: String,
        enum: ['basic', 'standard', 'premium'],
        default: 'basic',
    },
    amount: { type: Number, required: true },

    // Status
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending',
    },

    // Additional notes from user
    message: { type: String, default: '', trim: true },
}, { timestamps: true });

// Indexes for efficient availability queries
pujaBookingSchema.index({ pujaId: 1, bookingDate: 1 });
pujaBookingSchema.index({ bookingDate: 1, status: 1 });

module.exports = mongoose.model('PujaBooking', pujaBookingSchema);
