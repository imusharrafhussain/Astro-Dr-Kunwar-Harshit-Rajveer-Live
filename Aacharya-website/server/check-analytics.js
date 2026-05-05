const mongoose = require('mongoose');
require('dotenv').config();
const Analytics = require('./models/Analytics');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const records = await Analytics.find();
  console.log('Analytics Records:', records);
  mongoose.disconnect();
}).catch(console.error);
