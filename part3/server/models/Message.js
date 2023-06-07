const mongoose = require('mongoose');
const { Schema } = mongoose;

const Message = new Schema({
    created: { type: Date, default: Date.now },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true }
})
module.exports = mongoose.model('Message', Message)