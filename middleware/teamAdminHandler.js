const Team = require('../models/Team');

const teamAdminHandler = async (req, res, next) => {
  const team = await Team.findById(req.params.teamId);
  if (!team) {
    return res.status(404).json({
      success: false,
      errors: ['Team not found'],
    });
  }
  const user = req.user;
  if (team.admin.toString() === user._id.toString()) {
    req.team = team;
    next();
  } else {
    return res.status(401).json({
      success: false,
      errors: ['Not authorized to modify the team'],
    });
  }
};

module.exports = teamAdminHandler;
