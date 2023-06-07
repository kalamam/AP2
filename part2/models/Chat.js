const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./User');
const Message = require('./Message');

const Chat = new Schema({
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
})
module.exports = mongoose.model('Chat', Chat)