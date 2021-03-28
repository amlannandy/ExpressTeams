const express = require('express');

const authHandler = require('../middleware/authHandler');
const {
  fetchTeams,
  fetchTeam,
  createTeam,
  deleteTeam,
  updateTeam,
  addTeamMember,
  removeTeamMember,
  grantAdminPrivilege,
  revokeAdminPrivilege,
} = require('../controllers/teams');
const {
  validateCreateOrUpdateTeam,
  validateAddRemoveAdminOrMember,
} = require('../validators/teams');
const teamAdminHandler = require('../middleware/teamAdminHandler');
const teamMemberHandler = require('../middleware/teamMemberHandler');

const router = express.Router();

router
  .route('/')
  .get(authHandler, fetchTeams)
  .post([authHandler, validateCreateOrUpdateTeam], createTeam);

router
  .route('/:teamId')
  .get(authHandler, teamMemberHandler, fetchTeam)
  .put([authHandler, validateCreateOrUpdateTeam], updateTeam)
  .delete(authHandler, deleteTeam);

router.put(
  '/:teamId/add-member',
  [authHandler, teamAdminHandler, validateAddRemoveAdminOrMember],
  addTeamMember
);

router.delete(
  '/:teamId/remove-member',
  [authHandler, teamAdminHandler, validateAddRemoveAdminOrMember],
  removeTeamMember
);

router.put(
  '/:teamId/grant-admin-access',
  [authHandler, teamAdminHandler, validateAddRemoveAdminOrMember],
  grantAdminPrivilege
);

router.delete(
  '/:teamId/revoke-admin-access',
  [authHandler, teamAdminHandler, validateAddRemoveAdminOrMember],
  revokeAdminPrivilege
);

module.exports = router;
