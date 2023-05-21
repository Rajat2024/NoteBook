const httpStatus = require("http-status");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const updateUserById = async (userId, updateBody) => {
    const user = await getUserById(userId);
    if(!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
    }
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
}

module.exports = {
  getUserByEmail,
  getUserById,
  updateUserById,
};
