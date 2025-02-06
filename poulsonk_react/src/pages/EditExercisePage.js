import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditExercisePage = ({ exerciseToEdit }) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({name: name, reps: Number(reps), weight: Number(weight), unit: unit, date: date}),
            headers: {
                'Content-Type': 'application/json'
            }}); 
        if (response.status === 200) {
            window.alert('Exercise updated!');
        }
        else {
            window.alert('Exercise not updated. Make sure your input is correct.');
        }
        navigate('/');
    };

    return (
        <div>
            <h1>Update Workout</h1>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                min={1}
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                min={1}
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select value={unit} onChange={e => setUnit(e.target.value)}>
                <option value='unit'>unit</option>
                <option value='lbs'>lbs</option>
                <option value='kgs'>kgs</option>
            </select>
            <input
                type='text'
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={editExercise}
            >Save</button>
        </div>
    );
}

export default EditExercisePage;