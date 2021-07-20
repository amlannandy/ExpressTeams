const Team = require('../models/Team');

const teamMemberHandler = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) {
      return res.status(404).json({
        success: false,
        errors: ['Team not found'],
      });
    }
    const user = req.user;
    if (
      team.admin.toString() === user._id.toString() ||
      team.members.includes(user._id.toString())
    ) {
      req.team = team;
      next();
    } else {
      return res.status(401).json({
        success: false,
        errors: ['Not authorized to interact with this team'],
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: ['Error fetching team'],
    });
  }
};

module.exports = teamMemberHandler;
