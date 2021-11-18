const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    sendUserAuth(user, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorResponse('Provide Credentials', 400));

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) return next(new ErrorResponse('Invalid Credentials', 401));

    const passwordMatch = await user.comparePasswords(password);

    if (!passwordMatch)
      return next(new ErrorResponse('Invalid Credentials', 401));

    sendUserAuth(user, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = (req, res, next) => {
  res.send('Forgot Password');
};

exports.resetPassword = (req, res, next) => {
  res.send('Reset Password');
};

exports.refreshJwtToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return next(new ErrorResponse('Provide Credentials', 400));

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decoded.id);
    if (!user) return next(new ErrorResponse('No user found', 404));

    sendUserAuth(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const sendUserAuth = (user, statusCode, res) => {
  const accessToken = user.getSignedJwtAccessToken();
  const refreshToken = user.getSignedJwtRefreshToken();
  res.status(statusCode).json({
    success: true,
    accessToken,
    refreshToken,
    user: { id: user._id, username: user.username, email: user.email },
  });
};
