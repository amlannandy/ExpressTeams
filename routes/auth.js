const express = require('express');

const {
  register,
  login,
  getCurrentUser,
  logout,
  verifyAccount,
  deleteAccount,
  updateUserInfo,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth');
const {
  validateRegister,
  validateLogin,
  validateDeleteAccount,
  validateUpdateInfo,
  validateUpdatePassword,
  validateResetPassword,
  validateForgotPassword,
} = require('../validators/auth');
const authHandler = require('../middleware/authHandler');
const verifiedUserHandler = require('../middleware/verifiedUserHandler');

const router = express.Router();

router.post('/register', validateRegister, register);

router.post('/login', validateLogin, login);

router.get('/current-user', authHandler, getCurrentUser);

router.get('/logout', [authHandler, verifiedUserHandler], logout);

router.get('/verify-account/:token', verifyAccount);

router.put(
  '/update-info',
  [authHandler, verifiedUserHandler, validateUpdateInfo],
  updateUserInfo
);

router.put(
  '/update-password',
  [authHandler, verifiedUserHandler, validateUpdatePassword],
  updatePassword
);

router.post('/forgot-password', validateForgotPassword, forgotPassword);

router.post('/reset-password/:token', validateResetPassword, resetPassword);

router.delete('/delete', [authHandler, validateDeleteAccount], deleteAccount);

module.exports = router;
