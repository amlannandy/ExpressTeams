const express = require('express');

const {
  fetchTeams,
  fetchTeam,
  createTeam,
  deleteTeam,
  updateTeam,
  addTeamMember,
  removeTeamMember,
} = require('../controllers/teams');
const {
  validateCreateOrUpdateTeam,
  validateAddRemoveMember,
} = require('../validators/teams');
const authHandler = require('../middleware/authHandler');
const teamAdminHandler = require('../middleware/teamAdminHandler');
const teamMemberHandler = require('../middleware/teamMemberHandler');
const verifiedUserHandler = require('../middleware/verifiedUserHandler');

const router = express.Router();

router
  .route('/')
  .get(authHandler, fetchTeams)
  .post(
    [authHandler, verifiedUserHandler, validateCreateOrUpdateTeam],
    createTeam
  );

router
  .route('/:teamId')
  .get([authHandler, verifiedUserHandler, teamMemberHandler], fetchTeam)
  .put(
    [
      authHandler,
      verifiedUserHandler,
      teamAdminHandler,
      validateCreateOrUpdateTeam,
    ],
    updateTeam
  )
  .delete([authHandler, verifiedUserHandler, teamAdminHandler], deleteTeam);

router.put(
  '/:teamId/add-member',
  [authHandler, verifiedUserHandler, teamAdminHandler, validateAddRemoveMember],
  addTeamMember
);

router.put(
  '/:teamId/remove-member',
  [authHandler, verifiedUserHandler, teamAdminHandler, validateAddRemoveMember],
  removeTeamMember
);

module.exports = router;
