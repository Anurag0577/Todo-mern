const mongoose = require('mongoose')

let userSchema  = new Schema({
    username: String,
    email: String,
    password: String
})

let users = mongoose.model(users, userSchema); // model(< name of the collection in db, not found create new with the same name>)

module.exports = users;