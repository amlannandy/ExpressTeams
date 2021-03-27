const Team = require('../models/Team');
const asyncHandler = require('../middleware/asyncHandler');

// @description   Create a team
// @route         POST /api/v1/teams/
// @access        Private

exports.createTeam = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  const user = req.user;
  let team = await Team.findOne({ name: name, owner: user });
  if (team) {
    return res.status(403).json({
      success: false,
      errors: ['You already have a team with this name'],
    });
  }
  team = await Team.create({
    name,
    description,
    owner: user,
    admins: [user],
    members: [user],
  });
  res.status(200).json({
    success: true,
    data: team,
    msg: 'Team successfully created!',
  });
});

// @description   Get all teams user is part of
// @route         GET /api/v1/teams/
// @access        Private

exports.fetchTeams = asyncHandler(async (req, res, next) => {
  const teams = await Team.find({ owner: req.user });
  res.status(200).json({
    success: true,
    data: teams,
    msg: 'Teams successfully fetched',
  });
});

// @description   Get a team by its id
// @route         GET /api/v1/teams/:id
// @access        Private (Team Members only)

exports.fetchTeam = asyncHandler(async (req, res, next) => {
  const team = await Team.findById(req.params.id);
  if (!team) {
    return res.status(404).json({
      success: false,
      errors: ['Team not found'],
    });
  }
  res.status(200).json({
    success: true,
    data: team,
    msg: 'Team successfully fetched',
  });
});

exports.updateTeam = asyncHandler(async (req, res, next) => {
  let team = await Team.findById(req.params.id);
  if (!team) {
    return res.status(404).json({
      success: false,
      errors: ['Team not found'],
    });
  }
  if (team.owner.toString() != req.user._id) {
    return res.status(401).json({
      success: false,
      errors: ['Not authorized to update this team'],
    });
  }
  team = await Team.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: team,
    msg: 'Team updated!',
  });
});

exports.deleteTeam = asyncHandler(async (req, res, next) => {
  const team = await Team.findById(req.params.id);
  if (!team) {
    return res.status(404).json({
      success: false,
      errors: ['Team not found'],
    });
  }
  if (team.owner.toString() != req.user._id) {
    return res.status(401).json({
      success: false,
      errors: ['Not authorized to delete this team'],
    });
  }
  await Team.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    msg: 'Team successfully deleted!',
  });
});
