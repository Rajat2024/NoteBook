const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/Token');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/token');

const resetPassword = async (resetPasswordToken, newPassword) => {
    try {
        const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
        const user = await userService.getUserById(resetPasswordTokenDoc.user);
        if(!user) {
            throw new Error();
        }
        await userService.updateUserById(user.id, { password: newPassword });
        await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD, });
    } catch(error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed')
    }
};

module.exports = {
    resetPassword,
}