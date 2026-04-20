const Redis = require('ioredis');

const memoryStore = new Map();
let redis = null;
let redisHealthy = false;

function getRedisUrl() {
  return process.env.REDIS_URL || process.env.UPSTASH_REDIS_URL || '';
}

async function initCacheClient() {
  const redisUrl = getRedisUrl();
  if (!redisUrl) {
    console.log('Cache: Redis URL not configured. Using in-memory cache fallback.');
    return;
  }

  redis = new Redis(redisUrl, {
    maxRetriesPerRequest: 1,
    enableReadyCheck: true,
    lazyConnect: true,
  });

  redis.on('error', (error) => {
    redisHealthy = false;
    console.warn(`Cache: Redis error, falling back to memory cache. (${error.message})`);
  });

  try {
    await redis.connect();
    redisHealthy = true;
    console.log('Cache: Redis connected.');
  } catch (error) {
    redisHealthy = false;
    console.warn(`Cache: Redis unavailable (${error.message}). Using memory fallback.`);
  }
}

async function getCachedValue(key) {
  if (redis && redisHealthy) {
    const value = await redis.get(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  const entry = memoryStore.get(key);
  if (!entry) return null;
  if (entry.expiresAt < Date.now()) {
    memoryStore.delete(key);
    return null;
  }
  return entry.value;
}

async function setCachedValue(key, value, ttlSeconds) {
  if (redis && redisHealthy) {
    await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    return;
  }
  memoryStore.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

module.exports = {
  initCacheClient,
  getCachedValue,
  setCachedValue,
};
