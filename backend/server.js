const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // req.body

// CORS configuration
app.use((req, res, next) => {
    const requestOrigin = req.headers.origin;
    // Always echo request origin in dev to avoid mismatches
    if (requestOrigin) {
        res.header('Access-Control-Allow-Origin', requestOrigin);
        res.header('Vary', 'Origin');
    } else {
        const fallbackOrigin = process.env.CORS_ORIGIN || '*';
        res.header('Access-Control-Allow-Origin', fallbackOrigin);
    }

    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Max-Age', '600');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

const PORT = process.env.PORT || 3000;

// Import the router files
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'Digital Voting System API is running!', 
        status: 'success',
        timestamp: new Date().toISOString()
    });
});

// Use the routers
app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);
app.use('/settings', settingsRoutes);

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
    console.log(`API is available at: http://localhost:${PORT}`);
})
