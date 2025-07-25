const mongoose = require('mongoose');
require('dotenv').config();

// Use MongoDB URI from .env file or hardcoded fallback
const mongoURL = process.env.MONGODB_URL || "mongodb+srv://Vishal-Parihar-8104:0pNqFsB0OwKoW3sX@cluster0.tdbyxjq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
