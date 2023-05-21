const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transport
    .verify()
    .then(() => console.log('Connected to email server'))
    .catch(() => console.warn('Unable to connect to email server'));

const sendEmail = async (to, subject, text) => {
    const msg = { from: process.env.EMAIL_USER, to, subject, text };
    await transport.sendMail(msg);
};

const sendResetPasswordEmail = async (to, token) => {
    const subject = 'Reset password';
    const resetPasswordUrl = `http://link-to-app/reset-password/?token=${token}`;
    const text = `Dear user,
    To reset your password, click on this lisk: ${resetPasswordUrl}
    If you did not request any password reset, then ignore this email.`;
    await sendEmail(to, subject, text);
}

const sendVerificationEmail = async (to, token) => {
    const subject = 'Email Verification';
    // replace this url with the link to the email verification page of your front-end app
    const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
    const text = `Dear user,
  To verify your email, click on this link: ${verificationEmailUrl}
  If you did not create an account, then ignore this email.`;
    await sendEmail(to, subject, text);
  };

module.exports = {
    transport,
    sendEmail, 
    sendResetPasswordEmail,
    sendVerificationEmail
}
