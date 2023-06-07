const userService = require('../services/User');

const createUser = async (req, res) => {
    res.json(await userService.createUser(req.body.username,req.body.password, req.body.displayName, req.body.profilePic));
}
const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
        return res.status(404).json({errors: ['User not found']});
    }
    res.json(user);
}
module.exports = { createUser, getUserById }