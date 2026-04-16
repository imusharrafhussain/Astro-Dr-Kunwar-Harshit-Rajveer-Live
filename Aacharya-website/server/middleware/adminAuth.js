const jwt = require('jsonwebtoken');

module.exports = function adminAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const secret = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET;
    const payload = jwt.verify(token, secret);
    if (!payload || payload.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    req.admin = { email: payload.email };
    return next();
  } catch {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
};
