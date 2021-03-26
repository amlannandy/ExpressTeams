const express = require('express');

const authHandler = require('../middleware/authHandler');
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

const router = express.Router();

router.post('/register', validateRegister, register);

router.post('/login', validateLogin, login);

router.get('/current-user', authHandler, getCurrentUser);

router.get('/logout', authHandler, logout);

router.get('/verify-account/:token', verifyAccount);

router.put('/update-info', [authHandler, validateUpdateInfo], updateUserInfo);

router.put(
  '/update-password',
  [authHandler, validateUpdatePassword],
  updatePassword
);

router.post('/forgot-password', validateForgotPassword, forgotPassword);

router.post('/reset-password/:token', validateResetPassword, resetPassword);

router.delete('/delete', [authHandler, validateDeleteAccount], deleteAccount);

module.exports = router;
