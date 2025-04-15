/**
 * Main Server File
 * Sets up the Express server, MongoDB connection, and defines all API endpoints
 */

const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const User = require('./Models/User')
const Todo = require('./Models/Todos')

const PORT = 3000
const app = express()

// Middleware setup
app.use(express.json())
app.use(cors())

/**
 * MongoDB Connection
 * Connects to the MongoDB Atlas cluster
 */
mongoose.connect("mongodb+srv://anurag0577:anurag0577@cluster0.afdw2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.log(err));

/**
 * JWT Token Generation
 * @param {Object} user - User object containing user data
 * @returns {string} JWT token
 */
function generateJwt(user){
    // Create a plain object with only the necessary user data
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    };
    let token = jwt.sign(payload, 'aNuRaG', {expiresIn: '24h'})
    return token;
}

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user data to request object
 */
function authenticateUser(req, res, next){
    try {
        let token = req.headers.authorization.split(' ')[1];
        let user = jwt.verify(token, 'aNuRaG');
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

/**
 * User Registration
 * Creates a new user account
 * @route POST /api/signup
 */
app.post('/api/signup', (req, res) => {
    let newUser = req.body;
    let user = new User({
        username: newUser.username,
        email: newUser.email,
        password: newUser.password
    })
    user.save()
    .then(() => {
        let token = generateJwt(newUser)
        res.send("Signup Successfull!", )
    })
})

/**
 * User Login
 * Authenticates user and returns JWT token
 * @route POST /api/login
 */
app.post('/api/login', (req, res) => {
    let userCred = req.body;
    console.log('Login attempt with credentials:', userCred);
    
    User.findOne({
        username: userCred.username,
        password: userCred.password
    })
    .then((user) => {
        if(user) {
            console.log('User found:', user);
            let token = generateJwt(user);
            res.json({
                message: "Login Successful!",
                token: token
            });
            localStorage.setItem('token', token);
        } else {
            console.log('No user found with these credentials');
            res.status(401).json({
                message: "Invalid username or password"
            });
        }
    })
    .catch((err) => {
        console.error('Login error:', err);
        res.status(500).json({
            message: "Error during login",
            error: err.message
        });
    });
})

/**
 * Get All Todos
 * Retrieves all todos for the authenticated user
 * @route GET /todos
 */
app.get('/todos', authenticateUser, (req, res) => {
    Todo.find({ userId: req.user._id })
        .then((todos) => {
            res.json(todos);
        })
        .catch((err) => {
            res.status(500).json({
                message: "Error fetching todos",
                error: err
            });
        });
});

/**
 * Create New Todo
 * Creates a new todo item for the authenticated user
 * @route POST /todo
 */
app.post('/todo', authenticateUser, (req, res) => {
    let newTodo = new Todo({
        userId: req.user._id,
        title: req.body.title,
        description: req.body.description,
        isCompleted: req.body.isCompleted
    })

    newTodo.save()
    .then(() => {
        res.status(201).json({
            message: "Todo Added Successfully",
            todo: newTodo
        });
    })
    .catch((error) => {
        res.status(500).json({
            message: "Error adding todo",
            error: error
        });
    });
});

/**
 * Update Todo
 * Modifies an existing todo item
 * @route PUT /todos/:id
 */
app.put('/todos/:id', authenticateUser, (req, res) => {
    let todoId = req.params.id;
    
    Todo.findById(todoId)
        .then((todo) => {
            if (!todo) {
                return res.status(404).json({
                    message: "Todo not found"
                });
            }

            if (todo.userId.toString() === req.user._id.toString()) {
                todo.title = req.body.title;
                todo.description = req.body.description;
                todo.isCompleted = req.body.isCompleted;

                return todo.save();
            } else {
                return res.status(403).json({
                    message: "Unauthorized: You can only modify your own todos"
                });
            }
        })
        .then((updatedTodo) => {
            if (updatedTodo) {
                res.json({
                    message: "Todo updated successfully",
                    todo: updatedTodo
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error updating todo",
                error: error
            });
        });
})

/**
 * Delete Todo
 * Removes a todo item
 * @route DELETE /todos/:id
 */
app.delete('/todos/:id', authenticateUser, (req, res) => {
    let todoId = req.params.id;
    
    Todo.findById(todoId)
        .then((todo) => {
            if (!todo) {
                return res.status(404).json({
                    message: "Todo not found"
                });
            }

            if (todo.userId.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    message: "Unauthorized: You can only delete your own todos"
                });
            }

            return Todo.findByIdAndDelete(todoId);
        })
        .then((deletedTodo) => {
            if (deletedTodo) {
                res.json({
                    message: "Todo deleted successfully",
                    todo: deletedTodo
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error deleting todo",
                error: error
            });
        });
});

// Start the server
app.listen(PORT, () => {
    console.log('Server Started!')
})