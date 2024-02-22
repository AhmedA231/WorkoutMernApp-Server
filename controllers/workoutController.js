const Workout = require('../models/workoutModel');
const mongoose = require('mongoose')

// GET ALL WORKOUTS
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}


// GET ONE WORKOUT
const getWorkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if(!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}


// CREATE NEW WORKOUT
const createWorkout = async (req, res) => {
        // Extract title, load, and reps from the request's body
        const {title, load, reps} = req.body;

        try {
            // Create a new workout document in the database
            const workout = await Workout.create({title, load, reps});
            // Respond with the newly created workout document
            res.status(200).json(workout);
        } catch (error) {
            // Handle errors (e.g., validation errors) by sending a 400 status code and the error message
            res.status(400).json({ error: error.message });
        }
}

// DELETE WORKOUT
const deleteWorkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}


// UPDATE WORKOUT
const updateWorkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}



module.exports = {
    getWorkout,
    getWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout

}