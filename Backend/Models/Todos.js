const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: String,
    description: String,
    isCompleted: {type: Boolean, default: false}
})

let Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;