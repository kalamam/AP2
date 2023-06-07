const tokenService = require('../services/Token');

const createToken = async (req, res) => {
    res.json(await tokenService.createUser(req.body.username,req.body.password));
}

module.exports = { createToken }