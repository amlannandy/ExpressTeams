const User = require('../models/User');
const Team = require('../models/Team');
const asyncHandler = require('../middleware/asyncHandler');

// @description   Create a team
// @route         POST /api/v1/teams/
// @access        Private
exports.createTeam = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  const user = req.user;
  let team = await Team.findOne({ name: name, admin: user });
  if (team) {
    return res.status(403).json({
      success: false,
      errors: ['You already have a team with this name'],
    });
  }
  team = await Team.create({
    name,
    description,
    admin: user,
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
  const userId = req.user._id;
  const teams = await Team.find({
    $or: [{ admin: userId }, { members: userId }],
  });
  res.status(200).json({
    success: true,
    data: teams,
    msg: 'Teams successfully fetched',
  });
});

// @description   Get all teams in which user is admin
// @route         GET /api/v1/teams/admin/
// @access        Private
exports.fetchAdminTeams = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const teams = await Team.find({ admin: userId });
  res.status(200).json({
    success: true,
    data: teams,
    msg: 'Admin teams successfully fetched',
  });
});

// @description   Get all teams in which user is only member
// @route         GET /api/v1/teams/member/
// @access        Private
exports.fetchMemberTeams = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const teams = await Team.find({ members: userId });
  res.status(200).json({
    success: true,
    data: teams,
    msg: 'Member teams successfully fetched',
  });
});

// @description   Get a team by its id
// @route         GET /api/v1/teams/:teamId
// @access        Private (Team Members only)
exports.fetchTeam = asyncHandler(async (req, res, next) => {
  const teamId = req.team._id;
  const team = await Team.findById(teamId)
    .populate('admin')
    .populate('members');
  res.status(200).json({
    success: true,
    data: team,
    msg: 'Team successfully fetched',
  });
});

// @description   Update a team
// @route         PUT /api/v1/teams/:teamId
// @access        Private (Admin only)
exports.updateTeam = asyncHandler(async (req, res, next) => {
  let team = await Team.findById(req.params.teamId);
  if (!team) {
    return res.status(404).json({
      success: false,
      errors: ['Team not found'],
    });
  }
  team = await Team.findByIdAndUpdate(req.params.teamId, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: team,
    msg: 'Team updated!',
  });
});

// @description   Delete a team
// @route         DELETE /api/v1/teams/:teamId
// @access        Private (Admin only)
exports.deleteTeam = asyncHandler(async (req, res, next) => {
  await Team.findByIdAndDelete(req.params.teamId);
  res.status(200).json({
    success: true,
    msg: 'Team successfully deleted!',
  });
});

// @description   Add member to a team
// @route         PUT /api/v1/teams/:teamId/add-member
// @access        Private (Owner and Admins)
exports.addTeamMember = asyncHandler(async (req, res, next) => {
  let team = req.team;
  const email = req.body.email;
  const user = req.user;
  const member = await User.findOne({ email: email });
  if (!member) {
    return res.status(404).json({
      success: false,
      errors: ['User with this email does not exist'],
    });
  }
  if (user._id.toString() === member._id.toString()) {
    return res.status(422).json({
      success: false,
      errors: ['You cannot add yourself'],
    });
  }
  if (team.members.includes(member._id.toString())) {
    return res.status(409).json({
      success: false,
      errors: ['User already in the team'],
    });
  }
  team.members.push(member._id);
  await team.save();
  team = await Team.findById(team._id);
  res.status(200).json({
    success: true,
    errors: ['Member successfully added!'],
    data: team,
  });
});

// @description   Remove member from a team
// @route         PUT /api/v1/teams/:teamId/remove-member
// @access        Private (Admin only)
exports.removeTeamMember = asyncHandler(async (req, res, next) => {
  let team = req.team;
  const email = req.body.email;
  const member = await User.findOne({ email: email });
  if (!member) {
    return res.status(200).json({
      success: true,
      errors: ['User with this email does not exist'],
    });
  }
  if (!team.members.includes(member._id.toString())) {
    return res.status(404).json({
      success: false,
      errors: ['User not present in the team'],
    });
  }
  const index = team.members.indexOf(member._id.toString());
  team.members.splice(index);
  await team.save();
  team = await Team.findById(team._id);
  res.status(200).json({
    success: true,
    errors: ['Member successfully removed!'],
    data: team,
  });
});
