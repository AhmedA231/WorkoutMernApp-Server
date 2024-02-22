require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');


const workoutRoute = require('./routes/workouts');

const app = express();

////////////////////////////////////////////////////////////////////
///////////////////////// Middleware //////////////////////////////
////////////////////////////////////////////////////////////////////

// Parse JSON bodies (as sent by API clients)
app.use(express.json()); // Parses incoming requests with JSON payloads

// Logging middleware for incoming requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes Middleware: Directs requests to /api/workouts to workoutRoute
app.use('/api/workouts', workoutRoute);

////////////////////////////////////////////////////////////////////
///////////////////////// Database Connection /////////////////////
////////////////////////////////////////////////////////////////////

// Connect to MongoDB using URI stored in .env file
mongoose.connect(process.env.MONGOURI)
 .then(() => {
    // Start server after successful database connection
    app.listen(process.env.PORT, () => {
        console.log(`Connected to database and listening on port ${process.env.PORT}!`);
    });
 })
 .catch((error) => {
    console.error(error);
 });
