const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const users = require('./Models/User')
const todos = require('./Models/Todos')

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

function authenticateUser(){
    let token = req.header.authorise.split(' ')[1];
    console.log(`Token is ${token}`);
    let user = jwt.verify(token, (err, data) => {
        return data
    } )
    req.user = user
    next()
}

//SIGNUP
app.post('/api/signup', (req, res) => {
        let newUser = req.body;
        let user = new users({
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

app.post('/api/login', (req, res) => {
    let userCred = req.body;
    users.findOne({
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

app.get('/todos', authenticateUser, (req, res) => {
    todos.find()
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




// listen on PORT 3000
app.listen(PORT, () => {
    console.log('Server Started!')
})

