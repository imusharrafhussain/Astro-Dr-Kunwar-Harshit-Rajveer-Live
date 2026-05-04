const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, trim: true, default: '' },
    service: { type: String, required: true },
    subject: { type: String, trim: true, default: '' },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    message: { type: String, default: '' },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending',
    },
}, { timestamps: true });

appointmentSchema.index({ status: 1 });
appointmentSchema.index({ preferredDate: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
