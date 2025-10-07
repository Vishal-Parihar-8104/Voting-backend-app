const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB using env var only
const mongoURL = process.env.MONGODB_URL;
if (!mongoURL) {
    console.error('Missing MONGODB_URL in environment variables');
    process.exit(1);
}

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Define the Candidate schema
const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    party: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    votes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            votedAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    voteCount: {
        type: Number,
        default: 0
    }
});

const Candidate = mongoose.model('Candidate', candidateSchema);

// Test vote count function
const testVoteCount = async () => {
    try {
        console.log('Testing vote count...');
        
        // Find all candidates
        const candidates = await Candidate.find().sort({voteCount: 'desc'});
        console.log('Found candidates:', candidates.length);
        
        // Map the candidates
        const voteRecord = candidates.map((candidate) => {
            return {
                party: candidate.party || 'Unknown Party',
                count: candidate.voteCount || 0
            };
        });
        
        console.log('Vote record:', JSON.stringify(voteRecord, null, 2));
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error in vote count:', error);
        process.exit(1);
    }
};

testVoteCount();
