require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { initCacheClient } = require('./config/cacheClient');

const app = express();

// ── Security ──
app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            "img-src": ["'self'", "data:", "https:"],
        },
    },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
const allowedOrigins = [
    process.env.CLIENT_URL || 'http://localhost:5173',
    process.env.ADMIN_URL || 'http://localhost:5174',
].filter(Boolean);

app.use(cors({
    origin: (origin, cb) => {
        // Allow same-origin, curl, and server-to-server requests
        if (!origin) return cb(null, true);
        if (allowedOrigins.includes(origin)) return cb(null, true);
        return cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));

// ── Rate Limiting ──
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100,
    message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// ── Body Parsing ──
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Routes ──
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/guna-milan', require('./routes/gunaMilanRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/puja-bookings', require('./routes/pujaBookingRoutes'));

// ── Health Check ──
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Error Handler ──
app.use(require('./middleware/errorHandler'));

// ── Start ──
const PORT = process.env.PORT || 5000;

Promise.all([connectDB(), initCacheClient()]).then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📡 API: http://localhost:${PORT}/api/health`);
    });
});
