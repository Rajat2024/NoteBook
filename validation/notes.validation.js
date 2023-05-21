const { body } = require("express-validator");

const addNoteValidation = [
  body("title", "Enter a valid title").isLength({ min: 3 }),
  body("description", "Enter a valid description").isLength({ min: 5 }),
];

module.exports = {
  addNoteValidation,
};
