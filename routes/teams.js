const express = require('express');

const authHandler = require('../middleware/authHandler');
const {
  fetchTeams,
  fetchTeam,
  createTeam,
  deleteTeam,
  updateTeam,
} = require('../controllers/teams');
const { validateCreateOrUpdateTeam } = require('../validators/teams');

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

module.exports = router;
