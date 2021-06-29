const Message = require('../models/Message');
const asyncHandler = require('../middleware/asyncHandler');

// @description   Get messages of a team
// @route         POST /api/v1/chats/:teamId
// @access        Private
exports.getTeamMessages = asyncHandler(async (req, res, next) => {
  const teamId = req.params.teamId;
  const messages = await Message.find({ team: teamId });
  res.status(200).json({
    success: true,
    data: messages,
    msg: 'Team messages fetched!',
  });
});
