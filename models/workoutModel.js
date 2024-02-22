const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define schema for workout collection
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {timestamps: true}) // Include creation and update timestamps

// Export the model to use it in other parts of the application
module.exports = mongoose.model('Workout', workoutSchema) 