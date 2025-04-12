const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const User = require('./Models/User')
const Todo = require('./Models/Todos')

const PORT = 3000

const app = express() // create an instance of express


app.use(express.json()) // This line is required if you plan to handle JSON data in your requests (like POST requests with JSON bodies). It's a middleware that parses incoming JSON payloads.

 // connect with MongoDB cluster0 
mongoose.connect("mongodb+srv://anurag0577:anurag0577@cluster0.afdw2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.log(err));

/*
API ENDPOINTS ...

POST '/api/login' - login in the app
POST '/api/signup' - Signup in the app
GET '/todos' - get all the todos
POST '/todos' - add new todo
PUT '/todos/:id' - Edit specific existing todo
DELETE '/todos/:id' - Delete the specific todo
*/

function generateJwt(user){
    let token = jwt.sign(user, 'aNuRaG', {expiresIn: '24h'})
    return token;
}

function authenticateUser(req, res, next){
    try {
        let token = req.headers.authorization.split(' ')[1];
        console.log(`Token is ${token}`);
        let user = jwt.verify(token, 'aNuRaG');
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

//SIGNUP
app.post('/api/signup', (req, res) => {
    let newUser = req.body;
    let user = new User({
        username: newUser.username,
        email: newUser.email,
        password: newUser.password
    })
    let savedUser = user.save()
    .then(() => {
        let token = generateJwt(newUser)
        console.log(token)
        res.send("Signup Successfull!")
    })
})

// LOGIN
app.post('/api/login', (req, res) => {
    let userCred = req.body;
    User.findOne({
        username: userCred.username,
        password: userCred.password
    })
    .then((user) => {
        if(user) {
            let token = generateJwt(user);
            res.json({
                message: "Login Successful!",
                token: token
            });
        } else {
            res.status(401).json({
                message: "Invalid username or password"
            });
        }
    })
    .catch((err) => {
        res.status(500).json({
            message: "Error during login",
            error: err
        });
    });
})


// GET ALL TODOS
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

// ADD NEW TODO
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

// MODIFY EXISTING TODO
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

// DELETE SPECIFIC TODOS
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


// listen on PORT 3000
app.listen(PORT, () => {
    console.log('Server Started!')
})