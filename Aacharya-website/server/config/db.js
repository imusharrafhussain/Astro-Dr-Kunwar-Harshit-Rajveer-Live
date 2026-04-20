const mongoose = require('mongoose');

let retryTimer = null;
let retryCount = 0;

const getRetryDelayMs = () => {
  const baseMs = Number(process.env.MONGO_RETRY_INTERVAL_MS || 5000);
  const maxMs = Number(process.env.MONGO_RETRY_MAX_INTERVAL_MS || 60000);
  const factor = Number(process.env.MONGO_RETRY_BACKOFF_FACTOR || 1.6);
  const delay = Math.round(baseMs * Math.pow(factor, Math.max(retryCount - 1, 0)));
  return Math.min(delay, maxMs);
};

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn('⚠️ MONGO_URI missing. Skipping MongoDB connection.');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    retryCount = 0;
    if (retryTimer) clearTimeout(retryTimer);
    retryTimer = null;
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    console.log(`⚠️ Continuing without database connection.`);

    const maxRetries = Number(process.env.MONGO_RETRY_MAX || 12);
    retryCount += 1;

    if (retryTimer) return;
    if (retryCount > maxRetries) {
      console.warn(`⚠️ MongoDB retry max reached (${maxRetries}). Will not retry further.`);
      return;
    }

    const retryIntervalMs = getRetryDelayMs();
    retryTimer = setTimeout(async () => {
      retryTimer = null;
      try {
        await connectDB();
      } catch {
        // connectDB already schedules next retry on its own failure
      }
    }, retryIntervalMs);
  }
};

module.exports = connectDB;
