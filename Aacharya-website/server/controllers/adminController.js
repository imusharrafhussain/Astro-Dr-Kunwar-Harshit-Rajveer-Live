const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Report = require('../models/Report');
const Appointment = require('../models/Appointment');
const Contact = require('../models/Contact');
const PujaBooking = require('../models/PujaBooking');

const User = require('../models/User');
const Analytics = require('../models/Analytics');
const sendEmail = require('../utils/sendEmail');
const { escapeHtml } = require('../utils/sanitize');

function getAdminSecret() {
  return process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET;
}

function signAdminToken(email) {
  const secret = getAdminSecret();
  return jwt.sign({ role: 'admin', email }, secret, { expiresIn: '7d' });
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

    const [reports, consultations, contacts, users] = await Promise.all([
      Report.countDocuments(),
      Appointment.countDocuments({
        $and: [
          { service: { $not: { $regex: 'Numerology', $options: 'i' } } },
          { service: { $not: { $regex: 'Vedic Birth', $options: 'i' } } },
          { service: { $not: { $regex: 'Relationship', $options: 'i' } } },
          { service: { $not: { $regex: 'Career & Finance', $options: 'i' } } }
        ]
      }),
      Contact.countDocuments(),
      User.countDocuments()
    ]);

    const [numerologyReports, numerologyAppointments, bookPujaAppointments, horoscopeAppointments] = await Promise.all([
      Report.countDocuments({ reportType: { $regex: 'Name Number', $options: 'i' } }),
      Appointment.countDocuments({ service: { $regex: 'Numerology', $options: 'i' } }),
      PujaBooking.countDocuments(),
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
        users,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.analytics = async (req, res, next) => {
  try {
    if (!assertDbConnected()) {
      return res.status(503).json({ success: false, error: 'Database is not connected.' });
    }

    // Aggregations for categories
    const [reports, appointments, pujas, analyticsRecords] = await Promise.all([
      Report.find().lean(),
      Appointment.find().lean(),
      PujaBooking.find().lean(),
      Analytics.find().lean()
    ]);

    const totalSubmissions = reports.length + appointments.length + pujas.length;
    
    // Calculate total visitors and formOpens
    let totalVisitors = 0;
    let formOpened = 0;
    analyticsRecords.forEach(record => {
      totalVisitors += (record.visitors || 0);
      formOpened += (record.formOpened || 0);
    });

    // Ensure sanity of funnel logic
    if (totalVisitors < totalSubmissions) totalVisitors = totalSubmissions;
    if (formOpened < totalSubmissions) formOpened = totalSubmissions;
    if (totalVisitors < formOpened) totalVisitors = formOpened;

    const formPartiallyFilled = Math.floor((formOpened + totalSubmissions) / 2);

    // Categories Breakdown
    let numerologyCount = 0;
    let consultationCount = 0;
    let horoscopeCount = 0;

    appointments.forEach(app => {
      const s = (app.service || '').toLowerCase();
      if (s.includes('numerology')) {
        numerologyCount++;
      } else if (s.includes('vedic birth') || s.includes('relationship') || s.includes('career')) {
        horoscopeCount++;
      } else {
        consultationCount++;
      }
    });

    reports.forEach(r => {
      const rt = (r.reportType || '').toLowerCase();
      if (rt.includes('name number') || rt.includes('numerology')) {
        numerologyCount++;
      } else {
        consultationCount++; // General reports count towards general consultations if not numerology
      }
    });

    const categoryData = [
      { name: 'Consultation', value: consultationCount },
      { name: 'Numerology', value: numerologyCount },
      { name: 'Book Puja', value: pujas.length },
      { name: 'Horoscope', value: horoscopeCount }
    ];

    // Status / Admin Actions Breakdown (Pending vs Confirmed vs Cancelled)
    const statusCounts = { pending: 0, confirmed: 0, cancelled: 0 };
    appointments.forEach(app => {
      if (app.status === 'confirmed') statusCounts.confirmed++;
      else if (app.status === 'cancelled') statusCounts.cancelled++;
      else statusCounts.pending++;
    });

    // Time-series data (Group submissions by date for the last 7 days)
    const timeSeries = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const istTime = new Date(d.getTime() + (330 * 60000));
      const dateStr = istTime.toISOString().split('T')[0];
      
      const statRecord = analyticsRecords.find(r => r.date === dateStr) || { visitors: 0 };
      
      // Count submissions for this date
      const subsForDate = [...reports, ...appointments, ...pujas].filter(item => {
        const itemDate = new Date(item.createdAt || item.date || Date.now());
        const itemIstTime = new Date(itemDate.getTime() + (330 * 60000));
        return itemIstTime.toISOString().split('T')[0] === dateStr;
      }).length;

      let dailyVisitors = statRecord.visitors || subsForDate;
      if (dailyVisitors < subsForDate) dailyVisitors = subsForDate;

      timeSeries.push({
        date: dateStr,
        visitors: dailyVisitors,
        submissions: subsForDate
      });
    }

    return res.json({
      success: true,
      data: {
        kpis: {
          visitors: totalVisitors,
          formOpened,
          submissions: totalSubmissions,
          conversionRate: totalVisitors > 0 ? ((totalSubmissions / totalVisitors) * 100).toFixed(1) : 0,
          dropOffs: formOpened - totalSubmissions
        },
        funnel: [
          { stage: 'Visitors', count: totalVisitors, fill: '#8884d8' },
          { stage: 'Form Opened', count: formOpened, fill: '#83a6ed' },
          { stage: 'Partial Fill', count: formPartiallyFilled, fill: '#8dd1e1' },
          { stage: 'Submitted', count: totalSubmissions, fill: '#82ca9d' },
          { stage: 'Confirmed', count: statusCounts.confirmed, fill: '#a4de6c' }
        ],
        categories: categoryData,
        timeSeries,
        adminActions: [
          { name: 'Pending', value: statusCounts.pending, fill: '#f39c12' },
          { name: 'Confirmed', value: statusCounts.confirmed, fill: '#2ecc71' },
          { name: 'Cancelled', value: statusCounts.cancelled, fill: '#e74c3c' }
        ]
      }
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
      const rows = await Appointment.find({
        $and: [
          { service: { $not: { $regex: 'Numerology', $options: 'i' } } },
          { service: { $not: { $regex: 'Vedic Birth', $options: 'i' } } },
          { service: { $not: { $regex: 'Relationship', $options: 'i' } } },
          { service: { $not: { $regex: 'Career & Finance', $options: 'i' } } }
        ]
      })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();
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
      const rows = await PujaBooking.find().sort({ createdAt: -1 }).limit(limit).lean();
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
    if (category === 'users') {
      const rows = await User.find().select('-password').sort({ createdAt: -1 }).limit(limit).lean();
      return res.json({ success: true, data: rows });
    }

    return res.status(400).json({ success: false, error: 'Unknown category' });
  } catch (err) {
    console.error('[ADMIN CONTROLLER ERROR]:', err);
    return next(err);
  }
};

// ── Helper: resolve model from category ──────────────────────────────────────
function modelForCategory(category) {
  const c = String(category || '').toLowerCase();
  if (c === 'reports') return Report;
  if (c === 'consultations' || c === 'consultation') return Appointment;
  if (c === 'numerology') return null; // mixed — handle separately
  if (c === 'book-puja' || c === 'bookpuja') return PujaBooking;
  if (c === 'horoscope') return Appointment;
  if (c === 'contacts' || c === 'contact') return Contact;
  if (c === 'users') return User;
  return null;
}

// DELETE /api/admin/records/:category/:id
exports.deleteRecord = async (req, res, next) => {
  try {
    if (!assertDbConnected()) {
      return res.status(503).json({ success: false, error: 'Database not connected.' });
    }
    const { category, id } = req.params;
    const Model = modelForCategory(category);
    if (!Model) {
      return res.status(400).json({ success: false, error: 'Cannot delete from this category.' });
    }
    const deleted = await Model.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Record not found.' });
    }
    return res.json({ success: true, message: 'Record deleted.' });
  } catch (err) {
    return next(err);
  }
};

// PATCH /api/admin/records/:category/:id
exports.updateRecord = async (req, res, next) => {
  try {
    if (!assertDbConnected()) {
      return res.status(503).json({ success: false, error: 'Database not connected.' });
    }
    const { category, id } = req.params;
    const Model = modelForCategory(category);
    if (!Model) {
      return res.status(400).json({ success: false, error: 'Cannot update this category.' });
    }
    // Strip protected fields
    const { _id, __v, createdAt, updatedAt, password, ...safeBody } = req.body || {};

    const oldRecord = await Model.findById(id).lean();
    if (!oldRecord) {
      return res.status(404).json({ success: false, error: 'Record not found.' });
    }

    const updated = await Model.findByIdAndUpdate(id, { $set: safeBody }, { new: true, runValidators: false }).lean();

    if (Model.modelName === 'Appointment' && safeBody.status === 'confirmed' && oldRecord.status !== 'confirmed') {
      const safeName = escapeHtml(updated.name);
      const safeService = escapeHtml(updated.service);
      const safePreferredTime = escapeHtml(updated.preferredTime);
      const preferredDate = updated.preferredDate ? new Date(updated.preferredDate) : null;
      const safePreferredDate = preferredDate && !isNaN(preferredDate)
          ? preferredDate.toLocaleDateString()
          : '';

      sendEmail({
          to: updated.email,
          subject: 'Consultation Booking Confirmed — Astro Dr Kunwar Harshit Rajveer',
          html: `
      <h2>Hello ${safeName},</h2>
      <p>Your consultation booking has been <strong>confirmed</strong>!</p>
      <p><strong>Service:</strong> ${safeService}</p>
      ${safePreferredDate ? `<p><strong>Date:</strong> ${safePreferredDate}</p>` : ''}
      <p><strong>Time:</strong> ${safePreferredTime}</p>
      <p>We look forward to connecting with you.</p>
      <p>— Astro Dr Kunwar Harshit Rajveer Team</p>
    `,
      }).catch(console.error);
    }

    return res.json({ success: true, data: updated });
  } catch (err) {
    return next(err);
  }
};

