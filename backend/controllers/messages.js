const Message = require('../models/messages.js');
const messageController = {
    getAllMessages: async (req, res) => {
        const { userId, correspondingUserId } = req.query

        try {
            const query = {
                from_userId: userId,
                to_userId: correspondingUserId
            }
            const foundMessages = await Message.find(query);
            res.send(foundMessages);

        } catch (e) {
            console.log(e);
        }
    },
    postMessage: async (req, res) => {
        const { message } = req.body;
        try {
            const insertedMessage = await Message.create(message)
            res.send(insertedMessage)
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports = messageController;