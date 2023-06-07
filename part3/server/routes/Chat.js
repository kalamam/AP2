const chatController = require('../controllers/Chat');

const express  = require('express');
var router = express.Router();

router.route('/')
    .get(chatController.getChats)
    .post(chatController.createChat)

router.route('/:id/message')
    .get(chatController.getMessages)
    .post(chatController.addMessage)

module.exports = router;