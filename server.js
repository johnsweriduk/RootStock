// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

// Configuration
require('dotenv').config();
const app = express();
const db = mongoose.connection;
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use('/partials', express.static('partials'));

// Controllers
const portfolioController = require('./controllers/portfolio_controller.js');
app.use('/portfolio', portfolioController);

const userController = require('./controllers/user_controller.js');
app.use('/user', userController);

const sessionController = require('./controllers/session_controller.js');
app.use('/session', sessionController);

// Database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongod...');
});

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', process.env.MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// uncomment to wipe database
//db.dropDatabase(console.log('dropped'));

// Listener
app.listen(process.env.PORT, () => {
    console.log('listening...');
});