const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const adminAuth = require('../middleware/adminAuth');
const { login, summary, analytics, listRecords, deleteRecord, updateRecord } = require('../controllers/adminController');

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
router.get('/analytics', adminAuth, analytics);
router.get('/records/:category', adminAuth, listRecords);
router.delete('/records/:category/:id', adminAuth, deleteRecord);
router.patch('/records/:category/:id', adminAuth, updateRecord);

module.exports = router;


