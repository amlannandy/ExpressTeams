const jwt = require('jsonwebtoken');

const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const {
  sendVerificationMail,
  sendResetPasswordMail,
} = require('../utils/sendMail');

// @description   Register user
// @route         POST /api/v1/auth/register
// @access        Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (user) {
    return res.status(403).json({
      success: false,
      errors: ['Account with this email already exists'],
    });
  }
  user = await User.create({ name, email, password });
  const token = user.getJWTToken();
  const url = `${process.env.NODE_URL}/api/v1/auth/verify-account/${token}`;
  await sendVerificationMail(email, url);
  res.status(200).json({
    success: true,
    data: token,
    msg: 'Success! Please verify your account via email',
  });
});

// @description   Login user
// @route         POST /api/v1/auth/login
// @access        Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).select('+password');
  if (!user) {
    return res.status(404).json({
      success: false,
      errors: ['Account with this email does not exist'],
    });
  }
  const authResult = await user.matchPassword(password);
  if (!authResult) {
    return res.status(401).json({
      success: false,
      errors: ['Incorrect password'],
    });
  }
  const token = user.getJWTToken();
  res.status(200).json({
    success: true,
    data: token,
  });
});

// @description   Get current logged in user
// @route         GET /api/v1/auth/current-user
// @access        Private
exports.getCurrentUser = (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    data: user,
  });
};

// @description   Log out user
// @route         GET /api/v1/auth/logout
// @access        Private
exports.logout = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: 'Logged out',
  });
};

// @description   Verify a user account
// @route         GET /api/v1/auth/verify-account/:token
// @access        Public

exports.verifyAccount = asyncHandler(async (req, res, next) => {
  const token = req.params.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      errors: ['This account does not exist'],
    });
  }
  await User.findByIdAndUpdate(decoded.id, { isVerified: true });
  res.status(200).json({ success: true, msg: 'Account verified' });
});

// @description   Update a user's info
// @route         PUT /api/v1/auth/update-info
// @access        Private

exports.updateUserInfo = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
  const name = req.body.name;
  await User.findByIdAndUpdate(id, { name });
  res.status(200).json({ success: true, msg: 'Info updated' });
});

// @description   Update a user's password
// @route         PUT /api/v1/auth/update-password
// @access        Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
  const user = await User.findById(id).select('+password');
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const authResult = await user.matchPassword(currentPassword);
  if (!authResult) {
    return res.status(401).json({
      success: false,
      errors: ['Incorrect password'],
    });
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    msg: 'Password updated',
  });
});

// @description   Forgot password
// @route         POST /api/v1/auth/forgot-password
// @access        Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      errors: ['Account with that email does not exist'],
    });
  }
  const token = user.getJWTToken();
  const url = `${process.env.REACT_APP_URL}/reset-password/${token}`;
  await sendResetPasswordMail(email, url);
  res.status(200).json({
    success: true,
    msg: 'Link to reset your password has been sent. Please check your email',
  });
});

// @description   Reset password
// @route         POST /api/v1/auth/reset-password/:token
// @access        Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const token = req.params.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select('+password');
  if (!user) {
    return res.status(404).json({
      success: false,
      errors: ['This account does not exist'],
    });
  }
  const password = req.body.password;
  user.password = password;
  await user.save();
  res.status(200).json({ success: true, msg: 'Password reset successful' });
});

// @description   Delete a user account
// @route         DELETE /api/v1/auth/delete
// @access        Private
exports.deleteAccount = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
  const user = await User.findById(id).select('+password');
  const password = req.body.password;
  const authResult = await user.matchPassword(password);
  if (!authResult) {
    return res.status(401).json({
      success: false,
      errors: ['Incorrect password'],
    });
  }
  await User.findByIdAndDelete(user._id);
  res.status(200).json({
    success: true,
    msg: 'Account deleted',
  });
});
