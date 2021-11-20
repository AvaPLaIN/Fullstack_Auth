const express = require('express');
const router = express.Router();

//! IMPORT CONTROLLERS
const { getData } = require('../controllers/data');

//! IMPORT MIDDLEWARE
const { protect } = require('../middleware/auth');

router.route('/all').get(protect, getData);

module.exports = router;
