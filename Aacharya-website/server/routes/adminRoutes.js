const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const adminAuth = require('../middleware/adminAuth');
const { login, summary, listRecords } = require('../controllers/adminController');

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password is required'),
  ],
  validate,
  login
);

router.get('/summary', adminAuth, summary);
router.get('/records/:category', adminAuth, listRecords);

module.exports = router;

