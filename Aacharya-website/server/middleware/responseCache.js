const { getCachedValue, setCachedValue } = require('../config/cacheClient');

function responseCache(ttlSeconds = 300) {
  return async (req, res, next) => {
    if (req.method !== 'GET') return next();

    const cacheKey = `${req.originalUrl}`;
    try {
      const cachedPayload = await getCachedValue(cacheKey);
      if (cachedPayload) {
        res.set('X-Cache', 'HIT');
        return res.json(cachedPayload);
      }
    } catch (error) {
      console.warn(`Cache read failed: ${error.message}`);
    }

    const originalJson = res.json.bind(res);
    res.json = async (payload) => {
      try {
        await setCachedValue(cacheKey, payload, ttlSeconds);
        res.set('X-Cache', 'MISS');
      } catch (error) {
        console.warn(`Cache write failed: ${error.message}`);
      }
      return originalJson(payload);
    };

    return next();
  };
}

module.exports = responseCache;
