const mongoose = require('mongoose')

let todoSchema = new Schema({
    
    title: String,
    description: String,
    isCompleted: {type: Boolean, default: false}
})

let todos = mongoose.model(todos, todoSchema); // model(< name of the collection in db, not found create new with the same name>)

module.exports = todos;
