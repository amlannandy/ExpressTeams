const { check, validationResult } = require('express-validator');

exports.validateCreateOrUpdateTeam = [
  check('name').trim().not().isEmpty().withMessage('Please provide a name'),
  check('description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please provide a description'),
  (req, res, next) => sendErrorResponse(req, res, next),
];

const sendErrorResponse = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array().map(err => err.msg),
    });
  }
  next();
};
