const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;