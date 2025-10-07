const mongoose = require('mongoose');
require('dotenv').config();

// Use MongoDB URI from .env file; do not allow hardcoded fallbacks
const mongoURL = process.env.MONGODB_URL;
if (!mongoURL) {
    console.error('Missing MONGODB_URL in environment variables');
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Get the connection object
const db = mongoose.connection;

// Optional: Extra event listeners
db.on('disconnected', () => {
    console.log('❗ MongoDB disconnected');
});

module.exports = db;
