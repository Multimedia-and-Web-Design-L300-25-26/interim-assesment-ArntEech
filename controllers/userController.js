// ─── GET /api/user/profile ────────────────────────────────────────────────────
// Protected route — req.user is set by the auth middleware
const getProfile = async (req, res) => {
  try {
    const { _id, firstName, lastName, email, createdAt } = req.user;

    return res.status(200).json({
      user: {
        id:        _id,
        firstName,
        lastName,
        name:      `${firstName} ${lastName}`,
        email,
        memberSince: createdAt,
      },
    });
  } catch (err) {
    console.error('Get profile error:', err);
    return res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

module.exports = { getProfile };