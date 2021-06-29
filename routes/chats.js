const express = require('express');

const authHandler = require('../middleware/authHandler');
const teamMemberHandler = require('../middleware/teamMemberHandler');
const verifiedUserHandler = require('../middleware/verifiedUserHandler');

const { getTeamMessages } = require('../controllers/chats');

const router = express.Router();

router.get(
  '/:teamId',
  [authHandler, verifiedUserHandler, teamMemberHandler],
  getTeamMessages
);

module.exports = router;
