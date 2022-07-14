const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PasswordSchema = new Schema({
    role: {type: String, required: true},
    password: {type: String, required: true},
})

module.exports = mongoose.model('Password', PasswordSchema);