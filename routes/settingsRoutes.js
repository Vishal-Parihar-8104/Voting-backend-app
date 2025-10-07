const express = require('express');
const router = express.Router();
const Setting = require('../models/setting');
const { jwtAuthMiddleware } = require('../jwt');
const User = require('../models/user');

const checkAdminRole = async (userID) => {
  try {
    const user = await User.findById(userID);
    return user && user.role === 'admin';
  } catch {
    return false;
  }
};

// Get results visibility
router.get('/results-visibility', async (req, res) => {
  const setting = await Setting.findOne({ key: 'resultsVisibility' });
  const visible = setting ? Boolean(setting.value) : false;
  res.json({ visible });
});

// Update results visibility (admin only)
router.put('/results-visibility', jwtAuthMiddleware, async (req, res) => {
  const isAdmin = await checkAdminRole(req.user.id);
  if (!isAdmin) return res.status(403).json({ message: 'Access denied. Admin only.' });
  const { visible } = req.body;
  const updated = await Setting.findOneAndUpdate(
    { key: 'resultsVisibility' },
    { key: 'resultsVisibility', value: Boolean(visible) },
    { upsert: true, new: true }
  );
  res.json({ visible: Boolean(updated.value) });
});

module.exports = router;


