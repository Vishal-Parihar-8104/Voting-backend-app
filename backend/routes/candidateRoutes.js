const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Candidate = require('../models/candidate');
const { jwtAuthMiddleware } = require('../jwt');

/**
 * ✅ Helper Function: Check if user has admin role
 */
const checkAdminRole = async (userID) => {
  try {
    const user = await User.findById(userID);
    return user && user.role === 'admin';
  } catch (err) {
    console.error('Error checking admin role:', err);
    return false;
  }
};

/**
 * ✅ 1️⃣ Add New Candidate (Admin Only)
 */
router.post('/', jwtAuthMiddleware, async (req, res) => {
  try {
    const isAdmin = await checkAdminRole(req.user.id);
    if (!isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { name, age, party } = req.body;

    if (!name || !age || !party) {
      return res.status(400).json({ message: 'All fields are required: name, age, party' });
    }

    const newCandidate = new Candidate({
      name,
      age,
      party,
      voteCount: 0,
      votes: []
    });

    const response = await newCandidate.save();
    return res.status(201).json({
      message: '✅ Candidate added successfully',
      candidate: response
    });
  } catch (err) {
    console.error('Error adding candidate:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * ✅ 2️⃣ Update Candidate (Admin Only)
 */
router.put('/:candidateID', jwtAuthMiddleware, async (req, res) => {
  try {
    const isAdmin = await checkAdminRole(req.user.id);
    if (!isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const candidateID = req.params.candidateID;
    const updatedData = req.body;

    const candidate = await Candidate.findByIdAndUpdate(candidateID, updatedData, {
      new: true,
      runValidators: true
    });

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    return res.status(200).json({
      message: '✅ Candidate updated successfully',
      candidate
    });
  } catch (err) {
    console.error('Error updating candidate:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * ✅ 3️⃣ Delete Candidate (Admin Only)
 */
router.delete('/:candidateID', jwtAuthMiddleware, async (req, res) => {
  try {
    const isAdmin = await checkAdminRole(req.user.id);
    if (!isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const candidateID = req.params.candidateID;
    const deletedCandidate = await Candidate.findByIdAndDelete(candidateID);

    if (!deletedCandidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    return res.status(200).json({
      message: '✅ Candidate deleted successfully',
      candidate: deletedCandidate
    });
  } catch (err) {
    console.error('Error deleting candidate:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * ✅ 4️⃣ Get Vote Count for Each Candidate (Public Route)
 * 🔥 Important: Keep this ABOVE `/vote/:candidateID` to prevent "CastError"
 */
router.get('/vote/count', async (req, res) => {
  try {
    const result = await Candidate.aggregate([
      {
        $project: {
          name: 1,
          party: 1,
          voteCount: { $size: '$votes' }
        }
      }
    ]);

    res.status(200).json({
      message: '✅ Vote count fetched successfully',
      data: result
    });
  } catch (error) {
    console.error('Error in /vote/count:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

/**
 * ✅ 5️⃣ Vote for a Candidate (Voter Only)
 * - Only users with `role = voter` can vote
 * - Each user can vote only once
 */
router.post('/vote/:candidateID', jwtAuthMiddleware, async (req, res) => {
  const candidateID = req.params.candidateID;
  const userId = req.user.id;

  try {
    const candidate = await Candidate.findById(candidateID);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Admin cannot vote' });
    }

    if (user.isVoted) {
      return res.status(400).json({ message: 'You have already voted' });
    }

    // Record the vote
    candidate.votes.push({ user: userId });
    candidate.voteCount += 1;
    await candidate.save();

    user.isVoted = true;
    await user.save();

    return res.status(200).json({
      message: '🗳️ Vote recorded successfully',
      candidate: {
        name: candidate.name,
        party: candidate.party,
        totalVotes: candidate.voteCount
      }
    });
  } catch (err) {
    console.error('Error voting:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * ✅ 6️⃣ Get All Candidates (Public Route)
 */
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find({}, 'name party age voteCount');
    res.status(200).json({
      message: '✅ All candidates fetched successfully',
      data: candidates
    });
  } catch (err) {
    console.error('Error fetching candidates:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
