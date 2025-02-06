import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const createExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json'
            }}); 
        if (response.status === 201) {
            window.alert('Exercise created!');
        }
        else {
            window.alert('Exercise not created. Make sure your input is correct.');
        }
        navigate('/');
    };

    return (
        <div>
            <h1>Log Your Workout</h1>
            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                min={1}
                value={reps}
                placeholder="Enter Reps"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                min={1}
                placeholder="Enter Weight"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select value={unit} onChange={e => setUnit(e.target.value)}>
                <option value = 'unit'>unit</option>
                <option value = 'lbs'>lbs</option>
                <option value = 'kgs'>kgs</option>
            </select>
            <input
                type='text'
                placeholder='MM-DD-YY'
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={createExercise}
            >Add</button>
        </div>
    );
}

export default CreateExercisePage;