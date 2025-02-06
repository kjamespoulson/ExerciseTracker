import 'dotenv/config';
import * as exercises from './exercise_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.post('/exercises', (req, res) => {
    exercises.createExcercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            res.status(400).json({Error : 'Invalid Request'})            
        })
    });

app.get('/exercises/:_id', (req, res) => {
    exercises.findExercise(req.params._id)
        .then(exercise => {
            if (exercise !== null) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({Error : 'Not Found'});
            }
        });
});

app.get('/exercises', (req, res) => {
    exercises.readAll()
        .then(result => {
            res.status(200).json(result);
        })
});

function validateUpdate(req) {
    if (typeof req.body.name === 'string' && req.body.name.length > 0 && req.body.name.trim().length > 0) {
        if (typeof req.body.reps === 'number') {
            if (typeof req.body.weight === 'number') {
                if (req.body.unit === 'lbs' || req.body.unit === 'kgs') {
                    if (exercises.isDateValid(req.body.date) === true) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

app.put('/exercises/:_id', (req, res) => {
    if (validateUpdate(req) === false) {
        res.status(400).json({Error: 'Invalid Request'});
    } else {
        exercises.updateExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
            .then(exercise => {
                if (exercise !== null) {
                    res.status(200).json(exercise);
                } else {
                    res.status(404).json({Error : 'Not Found'});
                }
            });
}});

app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteExercise(req.params._id)
    .then(exercise => {
        if (exercise.deletedCount > 0) {
            res.status(204).json();
        } else {
            res.status(404).json({Error : 'Not Found'})
        }
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});