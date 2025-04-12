/**
 * Todo Model
 * Defines the schema and model for todo items in the MongoDB database
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Todo Schema
 * @property {ObjectId} userId - Reference to the User who owns this todo
 * @property {string} title - Title of the todo item
 * @property {string} description - Detailed description of the todo
 * @property {boolean} isCompleted - Status of the todo item (default: false)
 */
let todoSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: String,
    description: String,
    isCompleted: {type: Boolean, default: false}
})

// Create and export the Todo model
let Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;