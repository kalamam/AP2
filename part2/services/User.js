const User = require('..models/User')

const createUser = async (username, password, displayName, profilePic) => {
    const user = new User({username,password, displayName, profilePic});
    return await user.save();
}
const getUserById = async (id) => { return await User.findById(id); };
const getUsers = async () => { return await User.find({}); };

const getUserByUsername = async (username) => {
    return await User.findOne({username: username})
}

module.exports = { createUser, getUserById, getUsers, getUserByUsername }