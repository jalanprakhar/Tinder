const mongoose = require('mongoose');
const messageSchema = mongoose.Schema({

    timestamp: Date,
    from_userId: String,
    to_userId: String,
    message: String

});

module.exports = mongoose.model('Message', messageSchema);