/**
 * User Model
 * Defines the schema and model for user data in the MongoDB database
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * User Schema
 * @property {string} username - User's unique username
 * @property {string} email - User's email address
 * @property {string} password - User's hashed password
 */
let userSchema = new Schema({
    username: String,
    email: String,
    password: String
})

// Create and export the User model
let User = mongoose.model('User', userSchema)

module.exports = User;