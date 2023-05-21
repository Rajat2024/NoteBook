const { body, validationResult } = require("express-validator");

const createUserValidation = [
  body("email", "Enter a valid Email").isEmail(),
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("password", "Password must be atleast of 5 characters").isLength({
    min: 5,
  }),
];

const userLoginValidation = [
  body("email", "Enter a valid Email").isEmail(),
  body("password", "Password cannot be blank").exists(),
];

module.exports = {
  createUserValidation,
  userLoginValidation,
};
