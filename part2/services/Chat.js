const Chat = require('..models/Chat');
const Message = require('../models/Message');
const { User, getUserById } = require('./User');

const createChat = async (username, token) => {
    const user1 = await getUserById(token)._id;
    const user2 = await getUserByUsername(username)._id;
    const users = [user1, user2];
    const chat = await new Chat({users ,messages: []});
    return await chat.save();
}
const getChats = async (token) => {
    const user = await getUserById(token);
    const chats = await Chat.find({ users: user._id });
    return chats;
}
const getMessages = async (chatId, token) => {
    const chat = await getChatById(chatId);
    chat.populate('messages');
    return chat.messages;
}

const getChatById = async (id) => { return await Chat.findById(id); };
// const getChats = async () => { return await Chat.find({}); };

const addMessage = async (id, msg, token) => {
    const chat = await getChatById(id);
    const sender = await getUserById(token)._id;
    const message =  new Message({
        sender: sender,
        content: msg
    });
    chat.messages.push(message._id);  
    await chat.save();
    return message;
}

module.exports = { createChat, getChats, getChatById, getMessages, addMessage }