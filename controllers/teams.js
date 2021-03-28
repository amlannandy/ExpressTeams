const User = require('../models/User');
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
    admins: [],
    members: [],
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
  const teams = await Team.find();
  const userTeams = [];
  const userId = req.user._id.toString();
  teams.forEach(team => {
    let flag = false;
    if (team.owner.toString() == userId) flag = true;
    else if (team.admins.includes(userId)) flag = true;
    else if (team.members.includes(userId)) flag = true;
    if (flag) userTeams.push(team);
  });
  res.status(200).json({
    success: true,
    data: userTeams,
    msg: 'Teams successfully fetched',
  });
});

// @description   Get a team by its id
// @route         GET /api/v1/teams/:teamId
// @access        Private (Team Members only)
exports.fetchTeam = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.team,
    msg: 'Team successfully fetched',
  });
});

// @description   Update a team
// @route         PUT /api/v1/teams/:teamId
// @access        Private (Owner only)
exports.updateTeam = asyncHandler(async (req, res, next) => {
  let team = await Team.findById(req.params.teamId);
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

// @description   Delete a team
// @route         DELETE /api/v1/teams/:teamId
// @access        Private (Owner only)
exports.deleteTeam = asyncHandler(async (req, res, next) => {
  const team = await Team.findById(req.params.teamId);
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

// @description   Add member to a team
// @route         PUT /api/v1/teams/:teamId/add-member
// @access        Private (Owner and Admins)
exports.addTeamMember = asyncHandler(async (req, res, next) => {
  let team = req.team;
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({
      success: false,
      errors: ['User with this email does not exist'],
    });
  }
  const members = team.members;
  const admins = team.admins;
  if (
    team.owner.toString() == user._id.toString() ||
    members.includes(user._id.toString()) ||
    admins.includes(user._id.toString())
  ) {
    return res.status(409).json({
      success: false,
      errors: ['User already in the team'],
    });
  }
  await Team.findByIdAndUpdate(team._id, {
    members: [...members, user],
  });
  team = await Team.findById(team._id);
  res.status(200).json({
    success: true,
    errors: ['Member successfully added!'],
    data: team,
  });
});

// @description   Remove member from a team
// @route         DELETE /api/v1/teams/:teamId/remove-member
// @access        Private (Owner and Admins)
exports.removeTeamMember = asyncHandler(async (req, res, next) => {
  let team = req.team;
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(200).json({
      success: true,
      errors: ['User with this email does not exist'],
    });
  }
  const members = team.members;
  if (!members.includes(user._id.toString())) {
    return res.status(404).json({
      success: false,
      errors: ['User not present in the team'],
    });
  }
  const index = members.indexOf(user._id.toString());
  members.splice(index);
  await Team.findByIdAndUpdate(team._id, { members });
  team = await Team.findById(team._id);
  res.status(200).json({
    success: true,
    errors: ['Member successfully removed!'],
    data: team,
  });
});

// @description   Grant admin access to a team member
// @route         PUT /api/v1/teams/:teamId/grant-admin-access
// @access        Private (Owner and Admins)
exports.grantAdminPrivilege = asyncHandler(async (req, res, next) => {
  let team = req.team;
  const email = req.body.email;
  const user = await User.findOne({ email: email });

  // Check if user with that email exists
  if (!user) {
    return res.status(404).json({
      success: false,
      errors: ['User with this email does not exist'],
    });
  }

  // Check if user is already an admin
  const admins = team.admins;
  if (admins.includes(user._id.toString())) {
    return res.status(409).json({
      success: false,
      errors: ['User already an Admin'],
    });
  }

  // Check if user is part of the team
  const members = team.members;
  if (!members.includes(user._id.toString())) {
    return res.status(404).json({
      success: false,
      errors: ['User not present in the team'],
    });
  }

  // Remove user from members list
  const index = members.indexOf(user._id.toString());
  members.splice(index);

  await Team.findByIdAndUpdate(team._id, {
    members: members,
    admins: [...admins, user],
  });
  team = await Team.findById(team._id);
  res.status(200).json({
    success: true,
    errors: ['Admin access granted'],
    data: team,
  });
});

// @description   Revoke admin access from an admin
// @route         DELETE /api/v1/teams/:teamId/revoke-admin-access
// @access        Private (Owner and Admins)
exports.revokeAdminPrivilege = asyncHandler(async (req, res, next) => {
  let team = req.team;
  const email = req.body.email;
  const user = await User.findOne({ email: email });

  // Check if user with that email exists
  if (!user) {
    return res.status(404).json({
      success: false,
      errors: ['User with this email does not exist'],
    });
  }

  // Check if user is not an admin
  const admins = team.admins;
  if (!admins.includes(user._id.toString())) {
    return res.status(409).json({
      success: false,
      errors: ['User not an Admin'],
    });
  }

  // Remove user from admin list
  const index = admins.indexOf(user._id.toString());
  admins.splice(index);

  const members = team.members;
  await Team.findByIdAndUpdate(team._id, {
    members: [...members, user],
    admins: admins,
  });
  team = await Team.findById(team._id);
  res.status(200).json({
    success: true,
    errors: ['Admin access revoked'],
    data: team,
  });
});
