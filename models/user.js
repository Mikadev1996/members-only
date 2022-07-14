const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    date_joined: {type: Date, required: true},
    isMember: {type: Boolean, default: false, required: true},
    isAdmin: {type: Boolean, default: false, required: true}
})

module.exports = mongoose.model('User', UserSchema);