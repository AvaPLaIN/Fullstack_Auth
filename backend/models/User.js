const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//! SCHEMA
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Provide username'],
  },
  email: {
    type: String,
    required: [true, 'Provide email'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Provide valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Provide password '],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  verified: Boolean,
});

//! USER MIDDLEWARE
//     ! BCRYPT PASSWORD
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//     ! COMPARE PASSWORD
UserSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//     ! GENERATE JWT TOKEN
UserSchema.methods.getSignedJwtAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE,
  });
};

UserSchema.methods.getSignedJwtRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
