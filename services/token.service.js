const moment = require("moment");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const httpStatus = require("http-status");
const tokenSecret = process.env.SECRET_KEY;
const ressetPasswordExpirationMinutes =
  process.env.RESET_PASSWORD_EXPIRATION_MINUTES;
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../config/token");
const Token = require("../models/Token");

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

const generateToken = (userId, expires, type, secret = tokenSecret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const generateResetPasswordToken = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "No user with this email found");
  }
  // expiration time of token
  const expires = moment().add(ressetPasswordExpirationMinutes, "minutes");
  const resetPasswordToken = generateToken(
    user.id,
    expires,
    tokenTypes.RESET_PASSWORD
  );
  await saveToken(
    resetPasswordToken,
    user.id,
    expires,
    tokenTypes.RESET_PASSWORD
  );
  return resetPasswordToken;
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, tokenSecret);
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};

module.exports = {
  generateToken,
  generateResetPasswordToken,
  saveToken,
  verifyToken,
};
