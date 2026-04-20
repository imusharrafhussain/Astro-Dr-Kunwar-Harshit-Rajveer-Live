const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Report = require('../models/Report');
const Appointment = require('../models/Appointment');
const Contact = require('../models/Contact');

function getAdminSecret() {
  return process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET;
}

function signAdminToken(email) {
  const secret = getAdminSecret();
  return jwt.sign({ role: 'admin', email }, secret, { expiresIn: '12h' });
}

function assertDbConnected() {
  // readyState: 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
  if (mongoose.connection?.readyState !== 1) {
    return false;
  }
  return true;
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const adminHash = (process.env.ADMIN_PASSWORD_HASH || '').trim();

    if (!adminEmail || !adminHash) {
      return res.status(500).json({ success: false, error: 'Admin login is not configured' });
    }

    if (String(email).trim().toLowerCase() !== adminEmail) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(String(password), adminHash);
    if (!ok) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = signAdminToken(adminEmail);
    return res.json({ success: true, token, admin: { email: adminEmail } });
  } catch (err) {
    return next(err);
  }
};

exports.summary = async (req, res, next) => {
  try {
    if (!assertDbConnected()) {
      return res.status(503).json({
        success: false,
        error: 'Database is not connected right now. Please try again after MongoDB connects.',
      });
    }

    const [reports, consultations, contacts] = await Promise.all([
      Report.countDocuments(),
      Appointment.countDocuments(),
      Contact.countDocuments(),
    ]);

    const [numerologyReports, numerologyAppointments, bookPujaAppointments, horoscopeAppointments] = await Promise.all([
      Report.countDocuments({ reportType: { $regex: 'Name Number', $options: 'i' } }),
      Appointment.countDocuments({ service: { $regex: 'Numerology', $options: 'i' } }),
      Appointment.countDocuments({ service: { $regex: 'Puja', $options: 'i' } }),
      Appointment.countDocuments({
        $or: [
          { service: { $regex: 'Vedic Birth', $options: 'i' } },
          { service: { $regex: 'Relationship', $options: 'i' } },
          { service: { $regex: 'Career & Finance', $options: 'i' } },
        ],
      }),
    ]);

    return res.json({
      success: true,
      data: {
        reports,
        consultations,
        numerology: numerologyReports + numerologyAppointments,
        bookPuja: bookPujaAppointments,
        horoscope: horoscopeAppointments,
        contacts,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.listRecords = async (req, res, next) => {
  try {
    if (!assertDbConnected()) {
      return res.status(503).json({
        success: false,
        error: 'Database is not connected right now. Admin records are unavailable.',
      });
    }

    const category = String(req.params.category || '').toLowerCase();
    const limit = Math.min(Number(req.query.limit || 200), 1000);

    if (category === 'reports') {
      const rows = await Report.find().sort({ createdAt: -1 }).limit(limit).lean();
      return res.json({ success: true, data: rows });
    }
    if (category === 'consultation' || category === 'consultations') {
      const rows = await Appointment.find().sort({ createdAt: -1 }).limit(limit).lean();
      return res.json({ success: true, data: rows });
    }
    if (category === 'numerology') {
      const [reportRows, appointmentRows] = await Promise.all([
        Report.find({
          $or: [
            { reportType: { $regex: 'Name Number', $options: 'i' } },
            { reportType: { $regex: 'Numerology', $options: 'i' } },
          ],
        })
          .sort({ createdAt: -1 })
          .limit(limit)
          .lean(),
        Appointment.find({ service: { $regex: 'Numerology', $options: 'i' } })
          .sort({ createdAt: -1 })
          .limit(limit)
          .lean(),
      ]);

      const merged = [
        ...reportRows.map((r) => ({ ...r, source: 'report' })),
        ...appointmentRows.map((a) => ({ ...a, source: 'appointment' })),
      ];
      // Sort merged list by createdAt for better UX.
      merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return res.json({ success: true, data: merged.slice(0, limit) });
    }
    if (category === 'book-puja' || category === 'bookpuja') {
      const rows = await Appointment.find({ service: { $regex: 'Puja', $options: 'i' } })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();
      return res.json({ success: true, data: rows });
    }
    if (category === 'horoscope') {
      const rows = await Appointment.find({
        $or: [
          { service: { $regex: 'Vedic Birth', $options: 'i' } },
          { service: { $regex: 'Relationship', $options: 'i' } },
          { service: { $regex: 'Career & Finance', $options: 'i' } },
        ],
      })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();
      return res.json({ success: true, data: rows });
    }
    if (category === 'contacts' || category === 'contact') {
      const rows = await Contact.find().sort({ createdAt: -1 }).limit(limit).lean();
      return res.json({ success: true, data: rows });
    }

    return res.status(400).json({ success: false, error: 'Unknown category' });
  } catch (err) {
    return next(err);
  }
};

