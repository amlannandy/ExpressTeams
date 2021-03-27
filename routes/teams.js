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
} = require('../controllers/teams');
const { validateCreateOrUpdateTeam } = require('../validators/teams');
const teamAdminHandler = require('../middleware/teamAdminHandler');

const router = express.Router();

router
  .route('/')
  .get(authHandler, fetchTeams)
  .post([authHandler, validateCreateOrUpdateTeam], createTeam);

router
  .route('/:id')
  .get(authHandler, fetchTeam)
  .put([authHandler, validateCreateOrUpdateTeam], updateTeam)
  .delete(authHandler, deleteTeam);

router.put(
  '/:teamId/add-member',
  [authHandler, teamAdminHandler],
  addTeamMember
);

router.delete(
  '/:teamId/remove-member',
  [authHandler, teamAdminHandler],
  removeTeamMember
);

module.exports = router;
