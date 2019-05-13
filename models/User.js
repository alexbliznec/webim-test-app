const mongoose = require('../libs/mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
