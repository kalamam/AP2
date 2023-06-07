const chatService = require('../services/Chat');

const createChat = async (req, res) => {
    res.json(await chatService.createChat(req.body.username, req.headers.authorization.split(" ")[1]));
}

const getChats = async (req, res) => {
    res.json(await chatService.getChats(req.headers.authorization.split(" ")[1]));
}

const getMessages = async (req, res) => {
    res.json(await chatService.getMessages(req.params.id, req.headers.authorization.split(" ")[1]));
}

const addMessage = async (req, res) => {
    res.json(await chatService.addMessage(req.params.id, req.body.msg, req.headers.authorization.split(" ")[1]))
}

module.exports = { getChats, createChat, getMessages, addMessage }