const express = require('express');
const messageRouter = new express.Router();
const messageController = require('../controllers/messages.js');

messageRouter.get('/messages', messageController.getAllMessages)


messageRouter.post('/message', messageController.postMessage)

module.exports = messageRouter;