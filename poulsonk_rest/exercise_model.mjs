import mongoose from 'mongoose';
import 'dotenv/config';
import nodemon from 'nodemon';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;
db.once("open", () => {
    console.log("Working...");
});

const exerciseSchema = mongoose.Schema({
    name: { type: String, validate: {validator: isNameValid}, required: true },
    reps: { type: Number, min: 1, required: true },
    weight: { type: Number, min: 1, required: true },
    unit: { type: String, enum: ['lbs', 'kgs'], required: true },
    date: { type: String, validate: {validator: isDateValid}, required: true }
});

/**
 * 
 * @param {string} name
 * Return true if the string is not empty or null
 */
function isNameValid(name) {
    if (name.length > 0 && name.trim().length > 0) {
        return true;
    } else {
        return false;
    }
};

/**
* 
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

const Exercise = mongoose.model("Exercise", exerciseSchema);

const createExcercise = async (name, reps, weight, unit, date) => {
    const newExercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return newExercise.save();
};

const readAll = async () => {
    const query = Exercise.find();
    return query.exec();
};

const deleteExercise = async (_id) => {
    const deleted = await Exercise.deleteOne({_id: _id});
    return deleted;
};

const findExercise = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
};

const updateExercise = async (_id, name, reps, weight, unit, date) => {
    await Exercise.replaceOne({_id: _id}, {name: name, reps: reps, weight: weight, unit: unit, date: date});
    return findExercise(_id);
};

export {createExcercise, readAll, deleteExercise, updateExercise, findExercise, isDateValid};

