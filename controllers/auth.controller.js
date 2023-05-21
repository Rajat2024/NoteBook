const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, tokenService, emailService } = require("../services");

const forgotPassword = catchAsync(async (req, res) => {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
    await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
    res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
    await authService.resetPassword(req.query.token, req.body.password);
    res.status(httpStatus.NO_CONTENT).send()
})

module.exports = {
    forgotPassword,
    resetPassword
}
