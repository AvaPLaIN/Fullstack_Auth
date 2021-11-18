const express = require('express');
const router = express.Router();

//! IMPORT CONTROLLERS
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  refreshJwtToken,
} = require('../controllers/auth');

//! ROUTES
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:resetToken').put(resetPassword);
router.route('/refreshJwtAccessToken').post(refreshJwtToken);

module.exports = router;