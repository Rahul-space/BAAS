const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passwordResetSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    },
    expiresAt: {
        type: Date,
        required: true,
        expires: 3600
    }
});
module.exports = mongoose.model('PasswordReset', passwordResetSchema);