const Token = require('..models/Token')

const createToken = async (username, password) => {
    const token = new Token({username, password});
    return await token.save();
}

module.exports = { createToken }