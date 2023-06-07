const Message = require('../models/Message');
const { User } = require('./User');

const createMessage = async (content, token) => {
    const sender = await User.getUserById(token);
    const message  = await new Message({content: content, sender: sender._id});
    return await message.Save();
}

module.exports = { createMessage }