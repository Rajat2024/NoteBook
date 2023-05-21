const User = require("../models/User");

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports = {
  getUserByEmail,
};
