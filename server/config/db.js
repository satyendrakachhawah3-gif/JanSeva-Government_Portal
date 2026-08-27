const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/janseva_ai', {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`[JanSeva DB] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[JanSeva DB] MongoDB Connection Error: ${error.message}`);
    console.warn('[JanSeva DB] Retrying connection or using fallback mode...');
  }
};

module.exports = connectDB;
