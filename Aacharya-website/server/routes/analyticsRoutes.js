const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');

router.post('/ping', async (req, res) => {
  try {
    const { type } = req.body; // 'visitor' or 'formOpen'
    
    // Get current date string in YYYY-MM-DD for India timezone
    const dateObj = new Date();
    // Offset for IST (UTC+5:30) is 330 minutes
    const istTime = new Date(dateObj.getTime() + (330 * 60000));
    const date = istTime.toISOString().split('T')[0];
    
    let update = {};
    if (type === 'visitor') update = { $inc: { visitors: 1 } };
    else if (type === 'formOpen') update = { $inc: { formOpened: 1 } };
    else return res.json({ success: true, message: 'Invalid track type' });

    await Analytics.findOneAndUpdate(
      { date },
      update,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Analytics tracking error:', err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
