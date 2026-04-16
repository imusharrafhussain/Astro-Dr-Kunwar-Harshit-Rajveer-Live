const mongoose = require('mongoose');

let retryTimer = null;
let retryCount = 0;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    retryCount = 0;
    if (retryTimer) clearTimeout(retryTimer);
    retryTimer = null;
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    console.log(`⚠️ Continuing without database connection.`);

    // Retry in background so the admin dashboard can recover automatically
    const retryIntervalMs = Number(process.env.MONGO_RETRY_INTERVAL_MS || 5000);
    const maxRetries = Number(process.env.MONGO_RETRY_MAX || 0); // 0 = infinite
    retryCount += 1;

    if (retryTimer) return;
    if (maxRetries && retryCount > maxRetries) {
      console.warn(`⚠️ MongoDB retry max reached (${maxRetries}). Will not retry further.`);
      return;
    }

    console.warn(`🔁 Retrying MongoDB connection in ${retryIntervalMs}ms (attempt ${retryCount})...`);
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
